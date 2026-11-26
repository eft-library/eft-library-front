import sanitizeHtml from "sanitize-html";

export function sanitizeCommunityHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "mark", "s", "iframe"],
    allowedAttributes: {
      "*": ["style", "class"],
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      iframe: ["src", "title", "width", "height", "frameborder", "allow", "allowfullscreen"],
      td: ["colspan", "rowspan", "colwidth"],
      th: ["colspan", "rowspan", "colwidth"],
    },
    allowedStyles: {
      "*": {
        color: [/^(?:#[\da-f]{3,8}|rgba?\([\d\s.,%]+\)|[a-z]+)$/i],
        "background-color": [/^(?:#[\da-f]{3,8}|rgba?\([\d\s.,%]+\)|[a-z]+)$/i],
        "text-align": [/^(?:left|center|right|justify)$/],
        width: [/^\d+(?:\.\d+)?(?:px|%)$/],
        height: [/^\d+(?:\.\d+)?(?:px|%)$/],
      },
    },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "chzzk.naver.com"],
    allowIframeRelativeUrls: false,
  });
}
