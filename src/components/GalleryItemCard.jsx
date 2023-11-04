import React from "react";
import CheckBox from "./ui/CheckBox";

const GalleryItemCard = ({
  data = {},
  checked = false,
  checkHandler = (checked) => {},
}) => {
  return (
    <div className="border rounded-md overflow-hidden relative group w-full h-full">
      <div
        className={`absolute inset-0 ${
          !checked
            ? "bg-[rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity"
            : "bg-[rgba(0,0,0,0.1)]"
        }`}
      ></div>
      <CheckBox
        className="absolute top-3 left-3"
        onChange={(e) => checkHandler(e.target.checked)}
        checked={checked}
      />
      <img src={data?.attachment} alt={data?.name} className="w-full h-full" />
    </div>
  );
};

export default GalleryItemCard;
