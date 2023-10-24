import React from "react";

const MonsterFace = (props) => {
  const styles = {
    backgroundColor: props.status === true ? "#59E391" : "white",
  };

  return (
    <div className="die-face card" style={styles} onClick={props.function}>
      <img className="card-img" src={`${props.link}`} alt={`${props.value}`} />
    </div>
  );
};

export default MonsterFace;
