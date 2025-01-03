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
