import imageCompression from "browser-image-compression";

export const ImageHandler = ({ quillRef, API_ENDPOINTS }) => ({
  handler: async (dataUrl, type, imageData) => {
    const file = imageData.toFile();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: "image/jpeg",
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const blob = new Blob([compressedFile], { type: "image/jpeg" });
      const jpegFile = new File([blob], "compressed-image.jpg", {
        type: "image/jpeg",
      });

      const formData = new FormData();
      formData.append("file", jpegFile);

      const response = await fetch(API_ENDPOINTS, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const quill = quillRef.current?.getEditor();
      const index = (quill.getSelection() || {}).index;
      const insertionIndex =
        index === undefined || index < 0 ? quill.getLength() : index;
      quill.insertEmbed(insertionIndex, "image", data.data, "user");
    } catch (error) {
      console.error("Error uploading image:", error);
      return dataUrl;
    }
  },
});
