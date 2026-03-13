/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cacheLife } from "next/cache";
import { getCacheLife } from "../func/cache-jitter";

interface FetchSchema {
  status: number;
  msg: string;
  data: any;
}

export async function cacheRequestData(url: string) {
  "use cache";
  cacheLife(getCacheLife());

  const res = await fetch(url, {
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) {
    console.error("[API] fetch failed:", res.status, res.statusText, url);
    throw new Error("Failed to fetch data");
  }

  const json = await res.json();

  if (json.status !== 200) {
    console.error("[API] response error:", json.status, json.msg, url);
    throw new Error(json.msg || "Unknown error");
  }

  return json;
}

export async function requestData(url: string): Promise<FetchSchema | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 14400 },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result: FetchSchema = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function requestPostData(
  url: string,
  body: any,
): Promise<FetchSchema | null> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result: FetchSchema = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function requestUserData(url: string, body: any, session: any) {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (session?.accessToken) {
      headers.Authorization = `Bearer ${session.accessToken}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const result: FetchSchema = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function requestGetUserData(url: string, session: any) {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (session?.accessToken) {
      headers.Authorization = `Bearer ${session.accessToken}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const result: FetchSchema = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
