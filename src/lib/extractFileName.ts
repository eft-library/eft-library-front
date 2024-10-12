export const extractFileName = (fileName: string) => {
  const regex = /\/([^\/]+)\.webp$/;
  const match = fileName.match(regex);
  return match ? match[1] : fileName;
};
