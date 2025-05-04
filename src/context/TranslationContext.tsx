import React, { createContext, useEffect, useState, ReactNode } from "react";
import { loadData, saveData } from "../utils/storage";

// ID generator
const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

// Define types
type Keyword = {
  id: string;
  text: string;
};

type Translations = {
  [lang: string]: {
    [keywordId: string]: string;
  };
};

type TranslationData = {
  keywords: Keyword[];
  translations: Translations;
  currentLang: string;
};

type TranslationContextType = {
  data: TranslationData;
  setData: React.Dispatch<React.SetStateAction<TranslationData>>;
};

// Default data
const initialData: TranslationData = {
  keywords: [
    { id: generateId(), text: "hello" },
    { id: generateId(), text: "goodbye" },
  ],
  translations: {
    en: {},
    fr: {},
    de: {},
  },
  currentLang: "en",
};

// Context
export const TranslationContext = createContext<TranslationContextType>({
  data: initialData,
  setData: () => {},
});

// Provider
export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<TranslationData>(
    () => loadData() || initialData
  );

  useEffect(() => {
    saveData(data);
  }, [data]);

  return (
    <TranslationContext.Provider value={{ data, setData }}>
      {children}
    </TranslationContext.Provider>
  );
};
