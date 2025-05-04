// PublicView.tsx
import { useContext } from "react";
import { TranslationContext } from "../../context/TranslationContext";

export default function PublicView() {
  const { data } = useContext(TranslationContext);
  const { keywords, translations, currentLang } = data;

  return (
    <div className="public-view">
      <h2>Word Translations</h2>
      <div className="lang-selector">{currentLang}</div>

      <div className="card-list">
        {keywords.map((kw: any) => {
          const translated = translations[currentLang]?.[kw.id]?.trim();

          return (
            <div className="translation-card" key={kw.id}>
              <strong>{kw.text.toLowerCase()}</strong>
              <p>{translated ? translated : "No translation yet"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
