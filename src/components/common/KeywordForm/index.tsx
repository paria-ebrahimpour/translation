import React, { useState, ChangeEvent, FormEvent } from "react";
import { useTranslation } from "../../../context/TranslationContext";
import { Modal } from "../../atoms";
import "./KeywordForm.css";

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
      <form className="form-container" onSubmit={handleSubmit}>
        <h3>Add / Update Keyword Across Languages</h3>

        <div className="form-group">
          <label>Key:</label>
          <input
            type="text"
            value={keyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setKeyword(e.target.value)
            }
            placeholder="Enter keyword"
          />
        </div>

        {languages.map((lang) => (
          <div className="form-group" key={lang}>
            <label>{lang.toUpperCase()}:</label>
            <input
              type="text"
              value={values[lang]}
              onChange={(e) => handleChange(lang, e.target.value)}
              placeholder={`Translation in ${lang}`}
            />
          </div>
        ))}

        <div className="flex justify-center gap-2">
          <button className="bg-[#3D90D7]" type="submit">
            Add / Update
          </button>
          <button
            className="border border-[#3D90D7] !text-[#3D90D7]"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default KeywordForm;
