import { readFile, realpath } from "node:fs/promises";
import path from "node:path";

const allowedPath =
  /^(?:index\.json|snapshots\/[a-f0-9]{32}\/(?:weapons\.json|weapons\/[a-f0-9]{24}\.json))$/;

function errorResponse(status: number) {
  return Response.json(
    { status, msg: status === 404 ? "NOT_FOUND" : "UNAVAILABLE", data: null },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const relativePath = (await context.params).path.join("/");
  if (!allowedPath.test(relativePath)) return errorResponse(404);
  try {
    // Resolve links as well as path segments: only files inside this domain's
    // public directory may be served, even when public itself is a mounted link.
    const root = await realpath(
      path.join(process.cwd(), "public/static/modding/v3"),
    );
    const filename = await realpath(path.join(root, relativePath));
    if (!filename.startsWith(`${root}${path.sep}`)) return errorResponse(404);
    const json = await readFile(filename, "utf8");
    return new Response(json, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control":
          relativePath === "index.json"
            ? "no-store"
            : "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    const code =
      error && typeof error === "object" && "code" in error
        ? error.code
        : undefined;
    return errorResponse(code === "ENOENT" || code === "ENOTDIR" ? 404 : 503);
  }
}
