import React, { useRef, useState } from "react";
import ImageCard from "./components/ImageCard";
import { MOCK_DATA } from "./constant/mockData";

const App = () => {
  /**
   * assign MOCK_DATA into local state for main data state
   */
  const [mockData, setMockData] = useState(MOCK_DATA);

  /**
   * Drag n drop for list sorting
   */
  const dragItem = useRef(0);
  const draggedOverItem = useRef(0);

  const sortHandler = () => {
    const data = [...mockData];
    const temp = data[dragItem.current];
    data[dragItem.current] = data[draggedOverItem.current];
    data[draggedOverItem.current] = temp;

    setMockData(data);
  };

  /**
   * Single selected data
   */
  const [selectedData, setSelectedData] = useState([]);

  const selectHandler = (item, checked) => {
    setSelectedData((prevState) => {
      if (checked) {
        return [...prevState, item];
      } else {
        return prevState.filter((fItem) => fItem !== item);
      }
    });
  };

  /**
   * Multiple select handler for select all item
   */
  const parentSelectHandler = (checked) => {
    let arr = [...mockData];
    if (checked) {
      setSelectedData(arr);
    } else {
      setSelectedData([]);
    }
  };

  /**
   * Select All check handler
   */
  const parentSelectorCheckedHandler = (value) => {
    let fields = [];
    value.map((item) => fields.push({ field: item, found: false }));

    fields.forEach((fItem) => {
      let find = selectedData.find((item) => item === fItem.field);
      if (find) {
        fItem["found"] = true;
      }
    });
    return !fields.some((item) => item.found === false);
  };

  /**
   * Remove or Delete selected data from mockData state by deleteHandler
   */
  const deleteHandler = () => {
    let data = [...mockData];
    if (selectedData?.length) {
      data = data.filter((el) => !selectedData.includes(el));
    }
    setMockData(data);
    setSelectedData([]);
  };

  return (
    <div className="p-2 lg:p-4 2xl:p-10">
      <div className="w-full md:w=[90%] 2xl:w-[80%] mx-auto shadow-xl rounded-md border">
        <div className="flex items-center justify-between px-6 py-3 border-b">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e) => parentSelectHandler(e.target.checked)}
              checked={parentSelectorCheckedHandler(mockData)}
            />
            <span>
              {!selectedData?.length
                ? "Select All"
                : `${selectedData?.length} file selected.`}
            </span>
          </label>
          <button className="text-red-500" onClick={deleteHandler}>
            Delete files
          </button>
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
              <ImageCard
                src={item?.attachemnt}
                alt={item?.name}
                onChange={(checked) => selectHandler(item, checked)}
                checked={selectedData.some((mItem) => mItem === item)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
