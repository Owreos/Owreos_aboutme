import React from "react";

type AppIconProps = {
  name: string;
  icon: string;
  onClick: () => void;
};

export default function AppIcon({ name, icon, onClick }: AppIconProps) {
  return (
    <div onClick={onClick}
    style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        padding: "12px",
        userSelect: "none",
    }}>
      <div
        style={{
          width: "60px",
          height: "60px",
          background: "#4a4a4a",
          border: "2px solid #666",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
        }}
      >
        📦
      </div>
      <div className="subtext">{name}</div>
    </div>
  );
}
