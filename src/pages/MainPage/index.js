import React from "react";
import Image from "../MainPage/components/Image";
import Title from "./components/Title";
import TenziesCover from "./components/TenziesCover";
const index = () => {
  return (
    <>
      <div className="game-container">
        <div className="image h-100 d-flex  w-50">
          <Image />
        </div>
        <div className="title-mainpage">
          <Title />
        </div>
      </div>
      <TenziesCover />
    </>
  );
};

export default index;
