import React from "react";

const WrongLetters = (props) => {
  return (
    <div className="wrong-letters-container">
      <div>
        {props.wrong.length > 0 && <h5>wrong letters</h5>}
        {props.wrong.map((letter, i) => (
          <span key={i}> {letter}</span>
        ))}
      </div>
    </div>
  );
};

export default WrongLetters;
