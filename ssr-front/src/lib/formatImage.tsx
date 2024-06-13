/**
 * 이미지 링크를 리턴 하는 함수
 * @param {*} link
 * @returns
 */

export const formatImage = (link: string) => {
  return process.env.NAS_URL + link;
};
