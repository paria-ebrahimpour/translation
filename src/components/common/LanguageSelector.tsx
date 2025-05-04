import { useContext } from "react";
import { TranslationContext } from "../../context/TranslationContext";

export default function LanguageSelector() {
  const { data, setData } = useContext(TranslationContext);

  const changeLanguage = (e: any) => {
    setData({ ...data, currentLang: e.target.value });
  };

  return (
    <select value={data.currentLang} onChange={changeLanguage}>
      {Object.keys(data.translations).map((lang) => (
        <option key={lang} value={lang}>
          {lang.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
