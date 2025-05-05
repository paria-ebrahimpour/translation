import { createContext, useContext, useEffect, useState } from "react";

const defaultTranslations = {
  en: { hello: "Hello", goodbye: "Goodbye" },
  fr: { hello: "Bonjour", goodbye: "Au revoir" },
  tr: { hello: "Merhaba", goodbye: "Hoşça kal" },
  fa: { hello: "سلام", goodbye: "خداحافظ" },
};

const LOCAL_STORAGE_KEY = "translations";
const LANG_KEY = "currentLanguage";

const TranslationContext = createContext({
  translations: {},
  currentLanguage: "en",
  updateTranslation: () => {},
  setCurrentLanguage: () => {},
});

export const useTranslation = () => useContext(TranslationContext);

export const TranslationProvider = ({ children }) => {
  const [translations, setTranslations] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultTranslations;
  });

  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem(LANG_KEY) || "en";
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(translations));
  }, [translations]);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, currentLanguage);
  }, [currentLanguage]);

  const updateTranslation = (lang, key, value) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [key]: value,
      },
    }));
  };

  const contextValue = {
    translations,
    currentLanguage,
    setCurrentLanguage,
    updateTranslation,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};
