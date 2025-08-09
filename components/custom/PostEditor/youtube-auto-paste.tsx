import Youtube from "@tiptap/extension-youtube";
import { Plugin, PluginKey } from "prosemirror-state";

// 유튜브 URL 정규식
const youtubeRegex =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;

export const YoutubeAutoPaste = Youtube.extend({
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("youtube-auto-paste"),
        props: {
          handlePaste: (view, event) => {
            const paste = event.clipboardData?.getData("text/plain");
            if (paste && youtubeRegex.test(paste)) {
              const match = paste.match(youtubeRegex);
              if (match && match[1]) {
                // 유튜브 iframe 삽입
                this.editor
                  .chain()
                  .focus()
                  .setYoutubeVideo({
                    src: `https://www.youtube.com/embed/${match[1]}`,
                  })
                  .run();

                return true; // 기본 paste 동작 막기
              }
            }
            return false; // 기본 paste 진행
          },
        },
      }),
    ];
  },
});
