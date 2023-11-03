import React, { useRef, useState } from "react";
import { MOCK_DATA } from "../constant/mockData";
import GalleryItemCard from "./GalleryItemCard";
import Button from "./ui/Button";
import Card from "./ui/Card";
import CheckBox from "./ui/CheckBox";
import FileUploader from "./ui/FileUploader";

const Gallery = () => {
  /**
   * Initialize 'mockData' state with the 'MOCK_DATA' array
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
   * Create an empty array in the state variable "selectedData"
   * to retrieve the selected data storage.
   */
  const [selectedData, setSelectedData] = useState([]);

  /**
   * Create the 'checkedHandler' function, which is used for checked or unchecked data.
   */
  const checkedHandler = (item, checked) => {
    setSelectedData((prevState) =>
      checked
        ? [...prevState, item]
        : prevState.filter((fItem) => fItem !== item)
    );
  };

  /**
   * Provide the 'parentSelectHandler' function, which is used for
   * selecting or deselecting all data.
   */
  const parentSelectHandler = (checked) => {
    setSelectedData(checked ? [...mockData] : []);
  };

  /**
   * Create a "parentSelectorCheckedHandler" function to handle checkbox status changes
   * that occur when selecting and deselecting data.
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
   * Provide the 'deleteHandler' function, which is used to delete data.
   */
  const deleteHandler = () => {
    if (selectedData?.length) {
      setMockData(mockData.filter((el) => !selectedData.includes(el)));
      setSelectedData([]);
    }
  };

  return (
    <Card
      header={
        !selectedData?.length ? (
          <>
            <h4>Gallery</h4>
          </>
        ) : (
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
        )
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
              <GalleryItemCard
                data={item}
                checkHandler={(checked) => checkedHandler(item, checked)}
                checked={selectedData.some((mItem) => mItem === item)}
              />
            </div>
          ))}
          <FileUploader />
        </div>
      }
    />
  );
};

export default Gallery;
