import React from "react";
import Troll_Face from "../../../../assets/Troll_Face.png";

const MemeHeader = () => {
  return (
    <header className="header-memes">
      <img className="header--image" src={Troll_Face} alt="troll" />
      <h2 className="header--title">meme generator</h2>
    </header>
  );
};
export default MemeHeader;
