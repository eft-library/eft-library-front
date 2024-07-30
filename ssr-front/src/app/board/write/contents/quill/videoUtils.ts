export const insertVideo = (
  quillRef: any,
  videoUrl: string,
  insertPosition: number | null,
  setVideoUrl: (url: string) => void,
  onClose: () => void
) => {
  const quill = quillRef.current?.getEditor();
  if (videoUrl) {
    // URL이 YouTube 비디오 URL인지 확인
    const youtubeMatch = videoUrl.match(
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      const videoSrc = `https://www.youtube.com/embed/${videoId}`;
      const position =
        insertPosition !== null ? insertPosition : quill.getLength();

      // 비디오 삽입
      quill.insertEmbed(position, "video", videoSrc);

      // 커서 이동 (선택 영역 없을 경우)
      if (insertPosition === null) {
        quill.setSelection(position + 1);
      }
    } else {
      alert("유효한 YouTube URL이 아닙니다.");
    }
  }
  setVideoUrl("");
  onClose();
};

export const videoHandler = (
  quillRef: any,
  setInsertPosition: (position: number | null) => void,
  onOpen: () => void
) => {
  const quill = quillRef.current?.getEditor();
  if (quill) {
    const range = quill.getSelection();
    setInsertPosition(range ? range.index : quill.getLength()); // 현재 커서 위치 저장
  }
  onOpen();
};
