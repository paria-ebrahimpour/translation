import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface TranslationContextType {
  translations: Translations;
  currentLanguage: string;
  updateTranslation: (lang: string, key: string, value: string) => void;
  setCurrentLanguage: (lang: string) => void;
}

const defaultTranslations: Translations = {
  en: { hello: "Hello", goodbye: "Goodbye" },
  fr: { hello: "Bonjour", goodbye: "Au revoir" },
  tr: { hello: "Merhaba", goodbye: "Hoşça kal" },
  fa: { hello: "سلام", goodbye: "خداحافظ" },
};

const LOCAL_STORAGE_KEY = "translations";
const LANG_KEY = "currentLanguage";

const TranslationContext = createContext<TranslationContextType>({
  translations: {},
  currentLanguage: "en",
  updateTranslation: () => {},
  setCurrentLanguage: () => {},
});

export const useTranslation = (): TranslationContextType =>
  useContext(TranslationContext);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({
  children,
}) => {
  const [translations, setTranslations] = useState<Translations>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultTranslations;
  });

  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    return localStorage.getItem(LANG_KEY) || "en";
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(translations));
  }, [translations]);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, currentLanguage);
  }, [currentLanguage]);

  const updateTranslation = (lang: string, key: string, value: string) => {
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
