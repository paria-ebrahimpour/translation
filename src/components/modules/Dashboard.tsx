// DashboardView.tsx
import { useContext } from "react";
import { TranslationContext } from "../../context/TranslationContext";
import KeywordForm from "../common/KeywordForm";

export default function DashboardView() {
  const { data } = useContext(TranslationContext);
  const { keywords, translations, currentLang } = data;

  return (
    <div className="dashboard-view">
      <h2>Translation Management</h2>
      <div className="lang-selector">{currentLang}</div>
      <div className="translation-list">
        {keywords.map((kw) => {
          const translated = translations[currentLang]?.[kw.id] || "";
          const isMissing = !translated.trim();

          return (
            <div className="translation-row" key={kw.id}>
              <span className={`keyword ${isMissing ? "missing" : ""}`}>
                {kw.text}
              </span>
              <input
                className={`translation-input ${isMissing ? "missing" : ""}`}
                value={translated}
                readOnly
              />
            </div>
          );
        })}
      </div>
      <KeywordForm />
    </div>
  );
}
