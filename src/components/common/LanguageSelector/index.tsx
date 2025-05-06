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
      className="p-2 rounded-lg hover:bg-gray-100 border border-gray-200 text-[#27548A]"
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
