import React from "react";

const WrongLetters = (props) => {
  return (
    <div
      className={
        props.wrong.length > 0
          ? "wrong-letters-container"
          : "wrong-letters-container-hidden"
      }
    >
      <div>
        <h3 className="hangman--font">Wrong letters</h3>
        {props.wrong.map((letter, i) => (
          <span key={i}> {letter}</span>
        ))}
      </div>
    </div>
  );
};

export default WrongLetters;
