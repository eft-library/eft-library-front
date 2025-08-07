// iframe extension 예시 (tiptap extension으로 등록)
import { Node, mergeAttributes } from "@tiptap/core";

export const TipTapIframe = Node.create({
  name: "iframe",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: "800" },
      height: { default: "450" },
      frameborder: { default: "0" },
      allow: { default: "autoplay; clipboard-write; web-share" },
      allowfullscreen: { default: true },
    };
  },

  parseHTML() {
    return [{ tag: "iframe" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["iframe", mergeAttributes(HTMLAttributes)];
  },
});
