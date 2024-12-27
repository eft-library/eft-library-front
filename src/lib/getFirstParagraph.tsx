export const getFirstParagraph = (htmlString: string) => {
  // HTML 문자열을 DOM으로 파싱
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // 첫 번째 <p> 태그 선택
  const firstParagraph = doc.querySelector("p");

  // <p> 태그의 HTML을 반환
  return firstParagraph ? firstParagraph.outerHTML : null;
};
