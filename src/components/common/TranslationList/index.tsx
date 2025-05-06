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
    <div className="flex flex-col justify-start">
      {Object.entries(translations).map(([key, value]) => (
        <div
          key={key}
          className="mb-2 border-b pb-2 border-b-gray-200 flex items-center justify-between gap-3 px-2"
        >
          <p className="font-bold">{key}:</p>
          <div className="w-[150px]">
            <input
              type="text"
              value={value}
              className="bg-gray-100 rounded-lg shadow-sm !w-[150px]"
              onChange={(e) => onEdit(key, e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TranslationList;
