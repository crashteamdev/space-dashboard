import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./languages/en.json";
import russian from "./languages/ru.json";
import uzbekistan from "./languages/uz.json";

export const lang = ["en", "ru", "uz"];

const resources = {
  en: {
    translation: english,
  },
  ru: {
    translation: russian,
  },
  uz: {
    translation: uzbekistan,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "ru",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
