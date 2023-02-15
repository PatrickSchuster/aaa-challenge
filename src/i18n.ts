import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          million: "million",
          deutschland: "Germany",
          niederlande: "Netherlands",
          england: "England",
          spanien: "Spain",
          frankreich: "France",
          österreich: "Austria",
        },
      },
      de: {
        translation: {
          welcome: "Willkommen",
          million: "Millionen",
          deutschland: "Deutschland",
          Niederlande: "Niderlande",
          england: "England",
          spanien: "Spanien",
          frankreich: "Frankreich",
          österreich: "Österreich",
        },
      },
    },
  });
