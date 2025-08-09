"use client";

import DOMPurify from "dompurify";

export default function CommunityView() {
  const htmlContent = `<iframe src="https://vod.sooplive.co.kr/player/168276185/embed?type=catch&amp;showChat=false&amp;autoPlay=true&amp;mutePlay=true" width="640" height="512" frameborder="0" allow="clipboard-write; web-share;" allowfullscreen="true"></iframe><iframe src="https://chzzk.naver.com/embed/clip/v2l9KzO9LI" width="800" height="450" frameborder="0" allow="autoplay; clipboard-write; web-share" allowfullscreen=""></iframe><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://www.youtube.com/watch?v=yuRneJhCkME">(2) 프리즘 별수 가즈아ㅏㅏㅏㅏㅏ - YouTube</a></p><p></p><p></p><h1>qweqweqweqw</h1><table style="min-width: 75px;"><colgroup><col style="min-width: 25px;"><col style="min-width: 25px;"><col style="min-width: 25px;"></colgroup><tbody><tr><th colspan="1" rowspan="1"><table style="min-width: 75px;"><colgroup><col style="min-width: 25px;"><col style="min-width: 25px;"><col style="min-width: 25px;"></colgroup><tbody><tr><th colspan="1" rowspan="1"><p>1</p></th><th colspan="1" rowspan="1"><p></p></th><th colspan="1" rowspan="1"><p></p></th></tr><tr><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p>2</p></td><td colspan="1" rowspan="1"><p></p></td></tr><tr><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p>3</p></td></tr></tbody></table></th><th colspan="1" rowspan="1"><p></p></th><th colspan="1" rowspan="1"><p></p></th></tr><tr><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p>4</p></td><td colspan="1" rowspan="1"><p></p></td></tr><tr><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p></p></td><td colspan="1" rowspan="1"><p>5</p></td></tr></tbody></table><img src="https://image.eftlibrary.com/eftlibrary/tkl_community/posts_image/20250809034436840552_ai.webp" containerstyle="position: relative; width: 255px; height: auto; cursor: pointer; margin: 0px 0px 0px auto;" wrapperstyle="display: flex;"><p></p>`;
  const convertCustomStylesToStyleAttr = (html: string) => {
    // containerstyle -> style 변환
    html = html.replace(/containerstyle="([^"]*)"/g, 'style="$1"');
    // wrapperstyle 제거 (필요하면 래퍼 div 등에 적용 가능)
    html = html.replace(/wrapperstyle="[^"]*"/g, "");
    return html;
  };

  const purifyHtml = (html: string) => {
    return DOMPurify.sanitize(convertCustomStylesToStyleAttr(html), {
      ALLOWED_TAGS: [
        "b",
        "i",
        "em",
        "strong",
        "a",
        "p",
        "div",
        "span",
        "ul",
        "li",
        "ol",
        "br",
        "img",
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "style"],
    });
  };

  return (
    <div
      className="post-content"
      dangerouslySetInnerHTML={{
        __html: purifyHtml(htmlContent),
      }}
    />
  );
}
