import React from "react";
import MemeHeader from "./components/MemeHeader";
import FetchMeme from "./components/FetchMeme";

const MemesGame = () => {
  return (
    <div>
      <MemeHeader />
      <FetchMeme />
    </div>
  );
};

export default MemesGame;
