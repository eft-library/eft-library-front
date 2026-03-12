export const getCacheLife = (base = 86400) => {
  const MIN_JITTER = 14400; // 최소 4시간
  const jitter = MIN_JITTER + Math.floor(Math.random() * 14400); // 4~8시간 랜덤
  return {
    stale: base + jitter,
    revalidate: base + jitter,
    expire: base * 2 + jitter,
  };
};
