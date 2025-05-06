import React, { useState } from "react";
import { useTranslation } from "../../context/TranslationContext";
import { LanguageSelector, TranslationCard } from "../common";
import { LANGUAGES_LIST } from "../constants/languages";

const PublicViewPage: React.FC = () => {
  const { translations } = useTranslation();
  const [selectedLang, setSelectedLang] = useState("fa");

  const allKeys = Object.keys(
    Object.values(translations).reduce<Record<string, boolean>>(
      (acc, langData) => {
        Object.keys(langData).forEach((key) => {
          acc[key] = true;
        });
        return acc;
      },
      {}
    )
  );

  const currentLangData = translations[selectedLang] || {};

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Word Translations</h1>
        <LanguageSelector
          languages={LANGUAGES_LIST}
          selected={selectedLang}
          onChange={setSelectedLang}
        />
      </div>
      {allKeys.map((key) => (
        <TranslationCard
          key={key}
          keyword={key}
          translation={currentLangData[key]}
        />
      ))}
    </div>
  );
};

export default PublicViewPage;
