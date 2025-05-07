import React, { useState, ChangeEvent, FormEvent } from "react";
import { useTranslation } from "../../../context/TranslationContext";
import { Modal } from "../../atoms";

const languages = ["en", "fr", "tr", "fa"] as const;
type Language = (typeof languages)[number];

interface KeywordFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const KeywordForm: React.FC<KeywordFormProps> = ({ isOpen, onClose }) => {
  const { updateTranslation } = useTranslation();
  const [keyword, setKeyword] = useState<string>("");
  const [values, setValues] = useState<Record<Language, string>>({
    en: "",
    fr: "",
    tr: "",
    fa: "",
  });

  const handleChange = (lang: Language, value: string) => {
    setValues((prev) => ({
      ...prev,
      [lang]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
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
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-center">
          Add / Update Keyword Across Languages
        </h3>

        <div className="flex flex-col">
          <label className="mb-1 font-bold">Key:</label>
          <input
            type="text"
            value={keyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setKeyword(e.target.value)
            }
            placeholder="Enter keyword"
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        {languages.map((lang) => (
          <div className="flex flex-col" key={lang}>
            <label className="mb-1 font-bold">{lang.toUpperCase()}:</label>
            <input
              type="text"
              value={values[lang]}
              onChange={(e) => handleChange(lang, e.target.value)}
              placeholder={`Translation in ${lang}`}
              className="p-2 border border-gray-300 rounded"
            />
          </div>
        ))}

        <div className="flex justify-center gap-3 mt-2">
          <button
            type="submit"
            className="bg-[#3D90D7] text-white px-4 py-2 rounded shadow"
          >
            Add / Update
          </button>
          <button
            type="button"
            onClick={onClose}
            className="border border-[#3D90D7] !text-[#3D90D7] px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default KeywordForm;
