import { useContext } from "react";
import { TranslationContext } from "../../context/TranslationContext";

export default function KeywordList({ editable }: any) {
  const { data, setData } = useContext(TranslationContext);

  const updateTranslation = (id: any, value: any) => {
    setData({
      ...data,
      translations: {
        ...data.translations,
        [data.currentLang]: {
          ...data.translations[data.currentLang],
          [id]: value,
        },
      },
    });
  };

  return (
    <ul className="keyword-list">
      {data.keywords.map((k) => (
        <li key={k.id}>
          <strong>{k.text}</strong>
          {editable ? (
            <input
              type="text"
              value={data.translations[data.currentLang][k.id] || ""}
              onChange={(e) => updateTranslation(k.id, e.target.value)}
            />
          ) : (
            <span>{data.translations[data.currentLang][k.id] || ""}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
