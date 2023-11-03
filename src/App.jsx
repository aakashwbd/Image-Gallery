import React from "react";
import GalleryLayout from "./Layouts/GalleryLayout";
import Gallery from "./components/Gallery";

const App = () => {
  return (
    <GalleryLayout>
      <Gallery />
    </GalleryLayout>
  );
};

export default App;
