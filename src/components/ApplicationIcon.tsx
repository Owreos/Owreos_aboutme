import React from "react";

type AppIconProps = {
  name: string;
  icon: string;
  onClick: () => void;
};

export default function AppIcon({ name, icon, onClick }: AppIconProps) {
  return (
    <button onClick={onClick}>
      <img
        src={icon}
        alt={name}
        width="100"
        height="100"
      />
      <div className="subtext">{name}</div>
    </button>
  );
}
