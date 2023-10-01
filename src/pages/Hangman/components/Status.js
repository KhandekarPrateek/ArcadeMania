import React, { useEffect } from "react";
import { useState } from "react";

const Status = ({ currentWord, correctLetter, setCurrentWord }) => {
  const [play, setPlay] = useState(true);
  const wordLength = currentWord.split("");
  const wordLength1 = Array.from(new Set(wordLength));
  const checkWinner = () => {
    if (correctLetter.length === wordLength1.length) {
      wordLength1.forEach((element) => {
        if (correctLetter.includes(element)) {
          setPlay(false);
        }
      });
    }
  };
  useEffect(checkWinner);
  console.log(wordLength1, correctLetter);
  return <div>{play === false && <h1>YOU WON</h1>}</div>;
};

export default Status;
