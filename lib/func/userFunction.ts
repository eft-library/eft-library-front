export const getBanStatus = (
  start_time?: string | null,
  end_time?: string | null
) => {
  // start_time이 있으면서 end_time이 null → 영구정지
  if (start_time && end_time === null) return "permanent";

  // end_time이 없으면 제재 아님
  if (!end_time) return "none";

  // end_time이 값 있음 → 시간 비교
  const endTime = new Date(end_time).getTime();
  return endTime > Date.now() ? "temporary" : "none";
};
