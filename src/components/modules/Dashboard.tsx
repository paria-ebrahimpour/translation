import { useTranslation } from "../../context/TranslationContext";
import KeywordForm from "../common/KeywordForm";

const languages = ["en", "fr", "tr", "fa"];

const TranslationManagerPage = () => {
  const {
    translations,
    currentLanguage,
    setCurrentLanguage,
    updateTranslation,
  } = useTranslation();

  const currentTranslations = translations[currentLanguage] || {};

  const handleEditChange = (key, value) => {
    updateTranslation(currentLanguage, key, value);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 600, margin: "0 auto" }}>
      <h2>Translation Manager</h2>

      <label>
        Language:
        <select
          value={currentLanguage}
          onChange={(e) => setCurrentLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
      </label>

      <h3>Translations for: {currentLanguage.toUpperCase()}</h3>
      <ul>
        {Object.entries(currentTranslations).map(([key, value]) => (
          <li key={key} style={{ marginBottom: "8px" }}>
            <strong>{key}:</strong>{" "}
            <input
              type="text"
              value={value}
              onChange={(e) => handleEditChange(key, e.target.value)}
            />
          </li>
        ))}
      </ul>

      <hr />

      <KeywordForm />
    </div>
  );
};

export default TranslationManagerPage;
