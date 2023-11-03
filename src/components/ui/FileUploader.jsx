import React from "react";
import Thumbnail from "../../assets/images/thumbnail.png";

const FileUploader = () => {
  return (
    <label className="border border-dashed rounded-md w-full h-full flex flex-col items-center justify-center gap-2 bg-slate-100 cursor-pointer min-h-[260px]">
      <img src={Thumbnail} alt="thumbnail" />
      <p>Add Image</p>
      <input type="file" className="invisible absolute" />
    </label>
  );
};

export default FileUploader;
