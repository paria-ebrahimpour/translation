import React, { useState } from "react";
import { useTranslation } from "../../context/TranslationContext";
import { LanguageSelector, TranslationCard } from "../common";
import { LANGUAGES_LIST } from "../constants/languages";

const PublicView: React.FC = () => {
  const { translations } = useTranslation();
  const [selectedLang, setSelectedLang] = useState("fa");

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
      {currentLangData.map(({ word, translation }) => (
        <TranslationCard key={word} keyword={word} translation={translation} />
      ))}
    </div>
  );
};

export default PublicView;
