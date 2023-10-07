import React from "react";

const Word = (props) => {
  return (
    <div>
      {props.selectedWord.split("").map((letter, i) => {
        return (
          <span key={i} className="letter">
            {props.correctLetter.includes(letter) ? letter : " "}
          </span>
        );
      })}
    </div>
  );
};

export default Word;
