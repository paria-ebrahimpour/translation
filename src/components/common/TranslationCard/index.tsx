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
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
        {keyword}
      </div>
      <div style={{ color: "#444" }}>{translation || "No translation yet"}</div>
    </div>
  );
};

export default TranslationCard;
