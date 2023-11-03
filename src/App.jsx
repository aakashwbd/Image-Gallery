import React, { useRef, useState } from "react";
import ImageCard from "./components/ImageCard";
import { MOCK_DATA } from "./constant/mockData";
import Card from "./components/ui/Card";
import CheckBox from "./components/ui/CheckBox";
import Button from "./components/ui/Button";

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
      <Card
        header={
          <>
            <CheckBox
              label={
                !selectedData?.length
                  ? "Select All"
                  : `${selectedData?.length} file selected.`
              }
              onChange={(e) => parentSelectHandler(e.target.checked)}
              checked={parentSelectorCheckedHandler(mockData)}
            />
            <Button
              label="Delete Files"
              className="text-red-500"
              onClick={deleteHandler}
            />
          </>
        }
        cardContent={
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
                  data={item}
                  checkHandler={(checked) => selectHandler(item, checked)}
                  checked={selectedData.some((mItem) => mItem === item)}
                />
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
};

export default App;
