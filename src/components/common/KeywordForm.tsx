import { useState } from "react";
import { useTranslation } from "../../context/TranslationContext";

const languages = ["en", "fr", "tr", "fa"];

const KeywordForm = () => {
  const { updateTranslation } = useTranslation();
  const [keyword, setKeyword] = useState("");
  const [values, setValues] = useState({
    en: "",
    fr: "",
    tr: "",
    fa: "",
  });

  const handleChange = (lang, value) => {
    setValues((prev) => ({
      ...prev,
      [lang]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    languages.forEach((lang) => {
      const value = values[lang].trim();
      if (value) {
        updateTranslation(lang, keyword.trim(), value);
      }
    });

    setKeyword("");
    setValues({ en: "", fr: "", tr: "", fa: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
      <h3>Add / Update Keyword Across Languages</h3>

      <div>
        <label>Key: </label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter keyword"
        />
      </div>

      {languages.map((lang) => (
        <div key={lang}>
          <label>{lang.toUpperCase()}:</label>
          <input
            type="text"
            value={values[lang]}
            onChange={(e) => handleChange(lang, e.target.value)}
            placeholder={`Translation in ${lang}`}
          />
        </div>
      ))}

      <button type="submit">Add / Update</button>
    </form>
  );
};

export default KeywordForm;
