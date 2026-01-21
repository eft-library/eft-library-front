export const formatISODate = (isoDateString: string) => {
  // ISO 8601 문자열을 Date 객체로 변환
  const date = new Date(isoDateString);

  // toLocaleDateString을 사용하여 원하는 형식으로 포맷팅
  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // 원하는 형식으로 변환하고 마지막 점 제거 (예: 2024.05.23)
  return formattedDate.replace(/\./g, ".").slice(0, -1);
};

export const formatISODateTime = (isoDateString: string) => {
  const date = new Date(isoDateString);

  const formatted = date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24시간제
  });

  // `2024.05.23. 14:05` → 점 하나 제거
  return formatted.replace(/\./g, ".").replace(/\s*\.$/, "");
};

// 미니게임 매 시간 20분에 데이터 업데이트 -> 데이터가 15분에 들어옴
export const getMsUntilNext20 = () => {
  const now = new Date();

  const next = new Date(now);
  next.setMinutes(20, 0, 0);

  // 이미 20분이 지났으면 다음 시간 20분
  if (now.getMinutes() >= 20) {
    next.setHours(next.getHours() + 1);
  }

  return next.getTime() - now.getTime();
};
