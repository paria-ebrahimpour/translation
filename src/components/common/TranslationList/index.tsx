import React from "react";

interface TranslationListProps {
  translations: Record<string, string>;
  onEdit: (key: string, value: string) => void;
}

const TranslationList: React.FC<TranslationListProps> = ({
  translations,
  onEdit,
}) => {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {Object.entries(translations).map(([key, value]) => (
        <li key={key} style={{ marginBottom: "8px" }}>
          <strong>{key}:</strong>{" "}
          <input
            type="text"
            value={value}
            onChange={(e) => onEdit(key, e.target.value)}
          />
        </li>
      ))}
    </ul>
  );
};

export default TranslationList;
