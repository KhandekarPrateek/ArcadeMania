import React from "react";

const WrongLetters = (props) => {
  return (
    <div className="wrong-letters-container">
      <div>
        {props.wrong.length > 0 && (
          <h3 className="hangman--font">wrong letters</h3>
        )}
        {props.wrong.map((letter, i) => (
          <span key={i}> {letter}</span>
        ))}
      </div>
    </div>
  );
};

export default WrongLetters;
