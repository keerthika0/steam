
export const languages = ["en","es"];

export const validLanguage = lang => {
  return languages.includes(lang) ? lang : "es";
};

export const langDropDown = [
  { name: "English", value: "en" },
 { name: "Spanish", value: "es" },
];