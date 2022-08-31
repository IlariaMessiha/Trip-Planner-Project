import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./assets/i18n/en.json";
import translationFR from "./assets/i18n/fr.json";
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
};
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr",

    keySeparator: false,
    debug: true,

    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
