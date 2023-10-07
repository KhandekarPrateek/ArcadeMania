import React from "react";

const Image = (props) => {
  return (
    <img className="img-fluid pt-5 mt-5" src={props.image} alt="gameImage" />
  );
};
export default Image;
