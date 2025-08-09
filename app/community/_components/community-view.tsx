"use client";

import DOMPurify from "dompurify";

export default function CommunityView() {
  const htmlContent = `<iframe src="https://chzzk.naver.com/embed/clip/jvTkQ6fOl6" width="800" height="450" frameborder="0" allow="autoplay; clipboard-write; web-share" allowfullscreen=""></iframe><div data-youtube-video=""><iframe width="640" height="480" allowfullscreen="true" autoplay="false" disablekbcontrols="false" enableiframeapi="false" endtime="0" ivloadpolicy="0" loop="false" modestbranding="false" origin="" playlist="" rel="1" src="https://www.youtube.com/embed/8T67wwWbCkM" start="0"></iframe></div><h1>qweqwe</h1><p><span style="color: rgb(183, 37, 37);">asdasd</span></p>`;
  const convertCustomStylesToStyleAttr = (html: string) => {
    // containerstyle -> style 변환
    html = html.replace(/containerstyle="([^"]*)"/g, 'style="$1"');
    // wrapperstyle 제거 (필요하면 래퍼 div 등에 적용 가능)
    html = html.replace(/wrapperstyle="[^"]*"/g, "");
    return html;
  };

  const purifyHtml = (html: string) => {
    return DOMPurify.sanitize(convertCustomStylesToStyleAttr(html), {
      FORBID_TAGS: ["script"], // <script> 태그 제거
      FORBID_ATTR: ["on*"],
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
    });
  };

  return (
    <div
      className="ProseMirror"
      dangerouslySetInnerHTML={{
        __html: purifyHtml(htmlContent),
      }}
    />
  );
}
