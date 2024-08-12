export const removeImgVideo = (htmlString: string) => {
  // HTML 문자열을 DOM으로 파싱
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // 모든 <img> 태그 제거
  const imgTags = doc.querySelectorAll("img");
  imgTags.forEach((img) => img.remove());

  // 모든 <iframe> 태그 제거
  const iframeTags = doc.querySelectorAll("iframe");
  iframeTags.forEach((iframe) => iframe.remove());

  // 수정된 HTML을 문자열로 변환하여 반환
  return doc.body.innerHTML;
};

export const getFirstParagraph = (htmlString: string) => {
  // HTML 문자열을 DOM으로 파싱
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // 첫 번째 <p> 태그 선택
  const firstParagraph = doc.querySelector("p");

  // <p> 태그의 HTML을 반환
  return firstParagraph ? firstParagraph.outerHTML : null;
};
