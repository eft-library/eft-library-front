export function getCacheLife(base = 86400) {
  const minimumJitter = 14400;
  const jitter = minimumJitter + Math.floor(Math.random() * 14400);

  return {
    stale: base + jitter,
    revalidate: base + jitter,
    expire: base * 2 + jitter,
  };
}
