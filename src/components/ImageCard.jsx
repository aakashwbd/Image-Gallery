import React from "react";

const ImageCard = ({
  src = "",
  alt = "",
  checked = false,
  onChange = (checked) => {},
}) => {
  return (
    <div
      className={`cursor-move border rounded-md overflow-hidden relative group w-full h-full`}
    >
      <div
        className={`absolute inset-0 ${
          !checked
            ? "bg-[rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity"
            : "bg-[rgba(0,0,0,0.1)]"
        }`}
      ></div>
      <input
        type="checkbox"
        className="absolute top-3 left-3"
        onChange={(e) => onChange(e.target.checked)}
        checked={checked}
      />
      <img src={src} alt={alt} className="w-full h-full" />
    </div>
  );
};

export default ImageCard;
