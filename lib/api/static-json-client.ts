import { apiGet } from "@/lib/api/api-client";

export interface StaticJsonEnvelope<T> {
  status: number;
  msg: string;
  data: T | null;
  generated_at?: string;
}

interface StaticJsonOptions {
  revalidate?: number;
}

interface StaticJsonFallbackOptions<T> extends StaticJsonOptions {
  apiPath?: string;
  apiRevalidate?: number;
  fallback?: () => Promise<T>;
  preferApiInDevelopment?: boolean;
}

function normalizeStaticPath(staticPath: string) {
  const normalizedPath = staticPath.startsWith("/") ? staticPath : `/${staticPath}`;
  const pathname = normalizedPath.split("?")[0];

  if (!pathname.startsWith("/static/") || pathname.includes("..")) {
    throw new Error(`Invalid static JSON path: ${staticPath}`);
  }

  return normalizedPath;
}

function withVersion(staticPath: string, version: string) {
  const [pathname, queryString] = staticPath.split("?");
  const params = new URLSearchParams(queryString ?? "");
  params.set("v", version);
  return `${pathname}?${params.toString()}`;
}

async function readPublicJson<T>(staticPath: string): Promise<StaticJsonEnvelope<T>> {
  const fs = await import("node:fs/promises");
  const pathname = normalizeStaticPath(staticPath).split("?")[0];
  const filePath = `${process.cwd()}/public${pathname}`;
  const raw = await fs.readFile(filePath, "utf8");

  return JSON.parse(raw) as StaticJsonEnvelope<T>;
}

async function fetchPublicJson<T>(
  staticPath: string,
  { revalidate = 60 * 30 }: StaticJsonOptions = {},
): Promise<StaticJsonEnvelope<T>> {
  const normalizedPath = normalizeStaticPath(staticPath);

  if (typeof window === "undefined") {
    return readPublicJson<T>(normalizedPath);
  }

  const response = await fetch(normalizedPath, {
    next: { revalidate },
  } as RequestInit);

  if (!response.ok) {
    throw new Error(`Static JSON request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<StaticJsonEnvelope<T>>;
}

export async function getStaticDomainVersion(domain: string) {
  const indexPath = `/static/${domain}/v3/index.json`;
  const payload = await fetchPublicJson<unknown>(indexPath, { revalidate: 60 * 5 });

  if (payload.msg !== "OK" || !payload.generated_at) {
    throw new Error(`Static index returned invalid payload for ${indexPath}`);
  }

  return payload.generated_at;
}

export async function staticJsonGet<T>(
  domain: string,
  staticPath: string,
  options?: StaticJsonOptions,
) {
  const version = await getStaticDomainVersion(domain);
  const payload = await fetchPublicJson<T>(withVersion(staticPath, version), options);

  if (payload.msg !== "OK" || payload.data === null) {
    throw new Error(`Static JSON returned invalid payload for ${staticPath}`);
  }

  return payload.data;
}

function logStaticFallback(staticPath: string, error: unknown) {
  if (process.env.NODE_ENV === "production") {
    console.warn(`[static-json] fallback to API: ${staticPath}`);
    return;
  }

  console.warn(`[static-json] fallback to API: ${staticPath}`, error);
}

async function getFallbackData<T>({
  apiPath,
  apiRevalidate,
  fallback,
}: Pick<StaticJsonFallbackOptions<T>, "apiPath" | "apiRevalidate" | "fallback">) {
  if (fallback) {
    return fallback();
  }

  if (apiPath) {
    return apiGet<T>(apiPath, {
      revalidate: apiRevalidate,
    });
  }

  throw new Error("Static JSON fallback requires either apiPath or fallback");
}

export async function staticJsonGetWithFallback<T>(
  domain: string,
  staticPath: string,
  {
    apiPath,
    apiRevalidate,
    fallback,
    preferApiInDevelopment = true,
    ...staticOptions
  }: StaticJsonFallbackOptions<T>,
) {
  const shouldUseApiFirst = process.env.NODE_ENV === "development" && preferApiInDevelopment;

  if (shouldUseApiFirst && (apiPath || fallback)) {
    try {
      return await getFallbackData<T>({ apiPath, apiRevalidate, fallback });
    } catch (error) {
      console.warn(`[static-json] API first failed, trying static JSON: ${staticPath}`, error);
    }
  }

  try {
    return await staticJsonGet<T>(domain, staticPath, staticOptions);
  } catch (error) {
    logStaticFallback(staticPath, error);
    return getFallbackData<T>({ apiPath, apiRevalidate, fallback });
  }
}
