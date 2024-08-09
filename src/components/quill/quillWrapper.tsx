import { ALL_COLOR } from "@/util/consts/colorConsts";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import dynamic from "next/dynamic";

const QuillWrapper = dynamic(
  async () => {
    const { default: ReactQuill } = await import("react-quill");
    const { default: ImageDropAndPaste } = await import(
      "quill-image-drop-and-paste"
    );
    const Quill = ReactQuill.Quill;

    // VideoBlot을 확장하여 삭제 버튼 추가
    const BlockEmbed = Quill.import("blots/block/embed");

    class VideoBlot extends BlockEmbed {
      static create(value) {
        const node = super.create();
        node.setAttribute("contenteditable", "false");

        const iframe = document.createElement("iframe");
        iframe.setAttribute("width", "560");
        iframe.setAttribute("height", "315");
        iframe.setAttribute("src", value);
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "true");

        const wrapper = document.createElement("div");
        wrapper.className = "ql-video-wrapper";
        wrapper.appendChild(iframe);

        const button = document.createElement("button");
        button.innerHTML = "동영상 제거";
        button.className = "ql-video-delete";
        button.onclick = () => {
          wrapper.remove();
        };

        // 버튼 스타일 추가
        button.style.backgroundColor = ALL_COLOR.BLACK;
        button.style.color = ALL_COLOR.WHITE;
        button.style.border = "1px solid white";
        button.style.padding = "5px 10px";
        button.style.cursor = "pointer";
        button.style.transition = "background-color 0.3s";
        button.style.borderRadius = "8px";

        // 호버 효과 추가
        button.onmouseover = () => {
          button.style.backgroundColor = ALL_COLOR.LIGHT_GRAY;
        };
        button.onmouseout = () => {
          button.style.backgroundColor = ALL_COLOR.BLACK;
        };

        wrapper.appendChild(button);
        node.appendChild(wrapper);

        return node;
      }

      static value(node) {
        const iframe = node.querySelector("iframe");
        return iframe ? iframe.getAttribute("src") : "";
      }
    }

    VideoBlot.blotName = "video";
    VideoBlot.tagName = "div";
    Quill.register(VideoBlot);

    ReactQuill.Quill.register("modules/imageActions", ImageActions);
    ReactQuill.Quill.register("modules/imageFormats", ImageFormats);
    ReactQuill.Quill.register("modules/imageDropAndPaste", ImageDropAndPaste);

    return function comp({ forwardedRef, ...props }: any) {
      return <ReactQuill ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

export default QuillWrapper;
