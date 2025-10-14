import React from "react";

type AppIconProps = {
  name: string;
  iconsrc: string;
  onClick: () => void;
};

export default function AppIcon({ name, iconsrc, onClick }: AppIconProps) {
  return (
    <div onClick={onClick}
    style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        margin: "auto",
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
        }}>
          <img src={iconsrc} alt="" style={{height: "100%", width: "100%"}}/>
      </div>
      <div className="subtext" style={{color: "white", fontFamily: "Arial"}}>{name}</div>
    </div>
  );
}
