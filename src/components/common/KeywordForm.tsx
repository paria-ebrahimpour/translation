import { useState, useContext } from "react";
import { TranslationContext } from "../../context/TranslationContext";

export default function KeywordForm() {
  const { data, setData } = useContext(TranslationContext);
  const [keyword, setKeyword] = useState("");
  const [translation, setTranslation] = useState("");

  const generateId = (text: string) => {
    const randomSuffix = Math.random().toString(36); // e.g. 'k9f4z'
    return `kw-${text.toLowerCase().replace(/\s+/g, "-")}-${randomSuffix}`;
  };

  const addKeyword = () => {
    const id = generateId(keyword);
    const newKeyword = { id, text: keyword };

    const updatedTranslations = { ...data.translations };
    Object.keys(updatedTranslations).forEach((lang) => {
      updatedTranslations[lang][id] =
        lang === data.currentLang ? translation : "";
    });

    setData({
      ...data,
      keywords: [...data.keywords, newKeyword],
      translations: updatedTranslations,
    });

    setKeyword("");
    setTranslation("");
  };

  return (
    <div className="form">
      <input
        type="text"
        placeholder="New keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input
        type="text"
        placeholder={`Translation (${data.currentLang.toUpperCase()})`}
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
      />
      <button onClick={addKeyword}>Add</button>
    </div>
  );
}
