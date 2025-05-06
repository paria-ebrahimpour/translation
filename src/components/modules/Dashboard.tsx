import React, { useState } from "react";
import { useTranslation } from "../../context/TranslationContext";
import { KeywordForm, LanguageSelector, TranslationList } from "../common";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "tr", label: "Türkçe" },
  { code: "fa", label: "فارسی" },
] as const;

type Language = (typeof languages)[number]["code"];

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
    <div style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <h2>Translation Manager</h2>

      <LanguageSelector
        languages={languages}
        selected={currentLanguage}
        onChange={(lang) => setCurrentLanguage(lang as Language)}
      />

      <h3>Translations for: {currentLanguage.toUpperCase()}</h3>

      <TranslationList
        translations={currentTranslations}
        onEdit={handleEditChange}
      />

      <button onClick={() => setShowModal(true)} style={{ marginTop: "1rem" }}>
        Add Keyword
      </button>

      <KeywordForm isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default TranslationManagerPage;
