import { useState } from "react";
import { useTranslation } from "../../context/TranslationContext";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "tr", label: "Türkçe" },
  { code: "fa", label: "فارسی" },
];

const PublicViewPage = () => {
  const { translations } = useTranslation();
  const [selectedLang, setSelectedLang] = useState("fa");

  // Get all unique keys across all languages
  const allKeys = Object.keys(
    Object.values(translations).reduce((acc, langData) => {
      Object.keys(langData).forEach((key) => {
        acc[key] = true;
      });
      return acc;
    }, {})
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
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "6px" }}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {allKeys.map((key) => (
        <div
          key={key}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            backgroundColor: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            {key}
          </div>
          <div style={{ color: "#444" }}>
            {currentLangData[key] ? currentLangData[key] : "No translation yet"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PublicViewPage;
