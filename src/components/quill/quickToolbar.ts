export const QuillToolbar = ({ onVideoHandler }) => ({
  container: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "video"],
  ],
  handlers: {
    video: onVideoHandler,
  },
});

export const CommentToolbar = ({ onVideoHandler }) => ({
  container: [["link", "video"]],
  handlers: {
    video: onVideoHandler,
  },
});
