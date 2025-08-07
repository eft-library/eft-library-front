// lib/config/tiptap-iframe.ts
import { Node, mergeAttributes } from "@tiptap/core";

export const TipTapIframe = Node.create({
  name: "iframe",
  group: "block",
  atom: true,
  selectable: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: "100%" },
      height: { default: "315" },
      frameborder: { default: "0" },
      allow: {
        default:
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      },
      allowfullscreen: { default: "true" },
    };
  },

  parseHTML() {
    return [
      {
        tag: "iframe",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["iframe", mergeAttributes(HTMLAttributes)];
  },
});
