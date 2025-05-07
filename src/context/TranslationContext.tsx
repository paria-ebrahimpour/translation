import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type TranslationEntry = {
  word: string;
  translation: string;
};

export type Translations = {
  [lang: string]: TranslationEntry[];
};

interface TranslationContextType {
  translations: Translations;
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  updateTranslation: (lang: string, key: string, value: string) => void;
  reorderTranslations: (lang: string, newOrder: TranslationEntry[]) => void;
}

const defaultTranslations: Translations = {
  en: [
    { word: "hello", translation: "Hello" },
    { word: "goodbye", translation: "Goodbye" },
  ],
  fr: [
    { word: "hello", translation: "Bonjour" },
    { word: "goodbye", translation: "Au revoir" },
  ],
  tr: [
    { word: "hello", translation: "Merhaba" },
    { word: "goodbye", translation: "Hoşça kal" },
  ],
  fa: [
    { word: "hello", translation: "سلام" },
    { word: "goodbye", translation: "خداحافظ" },
  ],
};

const LOCAL_STORAGE_KEY = "translations";
const LANG_KEY = "currentLanguage";

const TranslationContext = createContext<TranslationContextType>({
  translations: {},
  currentLanguage: "en",
  setCurrentLanguage: () => {},
  updateTranslation: () => {},
  reorderTranslations: () => {},
});

export const useTranslation = () => useContext(TranslationContext);

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
    setTranslations((prev) => {
      const newTranslations: Translations = { ...prev };

      // Loop through all languages
      Object.keys(prev).forEach((languageKey) => {
        const existingEntry = prev[languageKey].find(
          (entry) => entry.word === key
        );

        if (existingEntry) {
          // Update the translation if it matches the given language
          if (languageKey === lang) {
            newTranslations[languageKey] = prev[languageKey].map((entry) =>
              entry.word === key ? { ...entry, translation: value } : entry
            );
          }
        } else {
          // Add entry — if current language, use provided value, else use null
          newTranslations[languageKey] = [
            ...prev[languageKey],
            {
              word: key,
              translation: languageKey === lang ? value : (null as any),
            },
          ];
        }
      });

      return newTranslations;
    });
  };

  const reorderTranslations = (lang: string, newOrder: TranslationEntry[]) => {
    setTranslations((prev) => ({
      ...prev,
      [lang]: newOrder,
    }));
  };

  return (
    <TranslationContext.Provider
      value={{
        translations,
        currentLanguage,
        setCurrentLanguage,
        updateTranslation,
        reorderTranslations,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
