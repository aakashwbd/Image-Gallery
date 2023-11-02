import React, { useRef, useState } from "react";
import ImageCard from "./components/ImageCard";
import { MOCK_DATA } from "./constant/mockData";

const App = () => {
  const [mockData, setMockData] = useState(MOCK_DATA);

  const dragItem = useRef(0);
  const draggedOverItem = useRef(0);

  const sortHandler = () => {
    const data = [...mockData];
    const temp = data[dragItem.current];
    data[dragItem.current] = data[draggedOverItem.current];
    data[draggedOverItem.current] = temp;

    setMockData(data);
  };

  return (
    <div className="p-2 lg:p-4 2xl:p-10">
      <div className="w-full md:w=[90%] 2xl:w-[80%] mx-auto shadow-xl rounded-md border">
        <div className="flex items-center justify-between px-6 py-3 border-b">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" />
            <span>3 File Selected</span>
          </label>
          <button className="text-red-500">Delete files</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 items-start px-6 py-3 gap-4">
          {mockData.map((item, i) => (
            <div
              key={i}
              className={i === 0 ? "md:row-span-2 md:col-span-2" : ""}
              draggable
              onDragStart={() => (dragItem.current = i)}
              onDragEnter={() => (draggedOverItem.current = i)}
              onDragEnd={sortHandler}
              onDragOver={(e) => e.preventDefault()}
            >
              <ImageCard src={item?.attachemnt} alt={item?.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
