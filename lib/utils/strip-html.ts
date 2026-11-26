const htmlEntities: Readonly<Record<string, string>> = {
  "&nbsp;": " ",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&amp;": "&",
};

export function stripHtml(value: string | null | undefined) {
  return (value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&(nbsp|lt|gt|quot|#39|amp);/g, (entity) => htmlEntities[entity])
    .replace(/\s+/g, " ")
    .trim();
}
