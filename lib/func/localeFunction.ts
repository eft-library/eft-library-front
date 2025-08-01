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

export const getHealthKey = (locale: string) => {
  switch (locale) {
    case "ja":
      return "bodyPart_ja";
    case "ko":
      return "bodyPart_ko";
    case "en":
    default:
      return "bodyPart_en";
  }
};

export const getZonesLocaleKey = (locale: string) => {
  switch (locale) {
    case "ja":
      return "zones_ja";
    case "ko":
      return "zones_ko";
    case "en":
    default:
      return "zones_en";
  }
};

export const getRicochetChanceLocaleKey = (locale: string) => {
  switch (locale) {
    case "ja":
      return "ricochet_chance_ja";
    case "ko":
      return "ricochet_chance_ko";
    case "en":
    default:
      return "ricochet_chance_en";
  }
};

export const getModesLocaleKey = (locale: string) => {
  switch (locale) {
    case "ja":
      return "modes_ja";
    case "ko":
      return "modes_ko";
    case "en":
    default:
      return "modes_en";
  }
};

export const getDescriptionLocaleKey = (locale: string) => {
  switch (locale) {
    case "ja":
      return "description_ja";
    case "ko":
      return "description_ko";
    case "en":
    default:
      return "description_en";
  }
};

export const getOtherLocalizedKey = (locale: string) => {
  switch (locale) {
    case "ja":
      return "name_ja";
    case "ko":
      return "name_ko";
    case "en":
    default:
      return "name_en";
  }
};

export const getEffectLocalizedKey = (locale: string) => {
  switch (locale) {
    case "ja":
      return "skill_name_ja";
    case "ko":
      return "skill_name_ko";
    case "en":
    default:
      return "skill_name_en";
  }
};
