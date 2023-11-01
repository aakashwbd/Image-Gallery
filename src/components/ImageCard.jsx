import React from "react";

const ImageCard = ({ src = "", alt = "" }) => {
  return (
    <div
      draggable
      className={`cursor-move border rounded-md overflow-hidden relative group w-full h-full`}
    >
      <div class="absolute inset-0 bg-[rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <input type="checkbox" className="absolute top-3 left-3" />
      <img src={src} alt={alt} className="w-full h-full" />
    </div>
  );
};

export default ImageCard;
