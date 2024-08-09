import { subHours, formatDistanceToNow, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

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

export const formatISOTime = (isoDateString: string) => {
  // ISO 8601 문자열을 Date 객체로 변환
  const date = new Date(isoDateString);

  // toLocaleString을 사용하여 원하는 형식으로 포맷팅
  const formattedDate = date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // 날짜와 시간을 원하는 형식으로 변환 (예: 2024.05.23 14:30:15)
  const dateTime = formattedDate.replace(/\./g, ".").slice(0, -1);

  return dateTime;
};

export const timeAgo = (dateString: string) => {
  // 서버에서 받은 시간이 한국 시간보다 9시간 늦다고 가정
  const utcDate = parseISO(dateString); // 문자열을 Date 객체로 변환
  const correctedDate = subHours(utcDate, 9); // 9시간 보정

  return formatDistanceToNow(correctedDate, { addSuffix: true, locale: ko });
};
