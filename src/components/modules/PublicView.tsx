import React, { useState } from "react";
import { useTranslation } from "../../context/TranslationContext";
import { LanguageSelector, TranslationCard } from "../common";
import { LanguageOption } from "../common/LanguageSelector";

const languages: LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "tr", label: "Türkçe" },
  { code: "fa", label: "فارسی" },
];

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
    <div style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <h2>Word Translations</h2>
        <LanguageSelector
          languages={languages}
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
