import React from "react";

const CheckBox = ({ label = "", ...props }) => {
  return label ? (
    <label className="inline-flex items-center gap-2">
      <input type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  ) : (
    <input type="checkbox" {...props} />
  );
};

export default CheckBox;
