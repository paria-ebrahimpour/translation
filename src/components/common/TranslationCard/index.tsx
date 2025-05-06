import React from "react";

interface TranslationCardProps {
  keyword: string;
  translation?: string;
}

const TranslationCard: React.FC<TranslationCardProps> = ({
  keyword,
  translation,
}) => {
  return (
    <div className="flex flex-col items-start gap-1 border border-[#ddd] rounded-lg p-3 mb-3 bg-white shadow-sm">
      <div className="font-bold">{keyword}</div>
      <div className="text-start text-[#444]">
        {translation || "No translation yet"}
      </div>
    </div>
  );
};

export default TranslationCard;
