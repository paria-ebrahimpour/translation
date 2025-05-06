import React from "react";

export interface LanguageOption {
  code: string;
  label: string;
}

interface LanguageSelectorProps {
  languages: readonly LanguageOption[];
  selected: string;
  onChange: (code: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selected,
  onChange,
}) => {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "6px" }}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
