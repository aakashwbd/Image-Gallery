import React from "react";

const Card = ({ header, cardContent }) => {
  return (
    <div className="w-full md:w=[90%] 2xl:w-[80%] mx-auto shadow-xl rounded-md border">
      <div className="flex items-center justify-between px-6 py-3 border-b">
        {header}
      </div>
      <div>{cardContent}</div>
    </div>
  );
};

export default Card;
