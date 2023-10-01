import React, { useEffect } from "react";
import { useState } from "react";

const Status = ({
  currentWord,
  correctLetter,
  setCurrentWord,
  wrong,
  words,
  setCorrectLetter,
  setWrongLetter,
}) => {
  const [play, setPlay] = useState(true);
  const [lose, setLose] = useState(false);
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
  const checkLosser = () => {
    wrong.length === 6 && setLose(true);
  };
  useEffect(checkWinner);
  useEffect(checkLosser);
  //   console.log(wordLength1, correctLetter);

  const playAgain = () => {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    setCorrectLetter([]);
    setWrongLetter([]);
    setLose(false);
    setPlay(true);
  };
  console.log(currentWord);

  return (
    <div>
      {play === false && <h1>YOU WON</h1>}
      {(play === false || lose === true) && (
        <button onClick={playAgain}>Start another game</button>
      )}
      {lose === true && <h1>YOU LOSE</h1>}
    </div>
  );
};

export default Status;
