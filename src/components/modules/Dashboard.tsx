import React, { useState } from "react";
import { useTranslation } from "../../context/TranslationContext";
import { KeywordForm, LanguageSelector, TranslationList } from "../common";
import { LANGUAGES_LIST } from "../constants/languages";

type Language = (typeof LANGUAGES_LIST)[number]["code"];

const TranslationManagerPage: React.FC = () => {
  const {
    translations,
    currentLanguage,
    setCurrentLanguage,
    updateTranslation,
  } = useTranslation();

  const [showModal, setShowModal] = useState(false);

  const currentTranslations: Record<string, string> =
    translations[currentLanguage] || {};

  const handleEditChange = (key: string, value: string) => {
    updateTranslation(currentLanguage, key, value);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h1>Translation Management</h1>

        <LanguageSelector
          languages={LANGUAGES_LIST}
          selected={currentLanguage}
          onChange={(lang) => setCurrentLanguage(lang as Language)}
        />
      </div>

      <TranslationList
        translations={currentTranslations}
        onEdit={handleEditChange}
      />

      <button className="bg-[#3D90D7]" onClick={() => setShowModal(true)} style={{ marginTop: "1rem" }}>
        Add Keyword
      </button>

      <KeywordForm isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default TranslationManagerPage;
