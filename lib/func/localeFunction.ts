export const getLocalizedKey = (locale: string) => {
  switch (locale) {
    case "ja":
      return "name_ja";
    case "ko":
      return "name_kr";
    case "en":
    default:
      return "name_en";
  }
};

export const getLocaleKey = (locale: string) => {
  switch (locale) {
    case "ja":
      return "ja";
    case "ko":
      return "ko";
    case "en":
    default:
      return "en";
  }
};
