const fallbackBaseUrl = "http://localhost:8000";

export function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_LOCAL_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    fallbackBaseUrl
  );
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://eftlibrary.com";
}
