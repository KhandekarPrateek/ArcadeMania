import React from "react";
import { useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import Figure from "./components/Figure";
import Word from "./components/Word";
import WrongLetters from "./components/WrongLetters";
import Status from "./components/Status";

const Hangman = () => {
  const words = ["apple", "oranges", "pineapple", "turd"];
  const selectedWord = words[Math.floor(Math.random() * words.length)];

  const [currentWord, setCurrentWord] = useState(selectedWord);
  const [correctLetter, setCorrectLetter] = useState([]);
  const [wrongLetter, setWrongLetter] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const handleKeyChange = (key, e) => {
    if (currentWord.includes(key)) {
      if (!correctLetter.includes(key)) {
        setCorrectLetter((prevCorrectLetter) => [...prevCorrectLetter, key]);
      } else {
        setShowNotification(true);
      }
    } else {
      if (!wrongLetter.includes(key)) {
        setWrongLetter((prevWrongLetter) => [...prevWrongLetter, key]);
      } else {
        setShowNotification(true);
      }
    }
  };

  setTimeout(() => {
    setShowNotification(false);
  }, 1000);

  return (
    <div>
      <Figure wrong={wrongLetter} />
      <Word selectedWord={currentWord} correctLetter={correctLetter} />

      {wrongLetter.length < 7 && (
        <KeyboardEventHandler
          handleKeys={["alphabetic"]}
          onKeyEvent={(key, e) => handleKeyChange(key, e)}
        ></KeyboardEventHandler>
      )}

      <WrongLetters wrong={wrongLetter} />
      {showNotification === true && <div>same</div>}
      <Status
        currentWord={currentWord}
        correctLetter={correctLetter}
        setCurrentWord={setCurrentWord}
        wrong={wrongLetter}
        words={words}
        setCorrectLetter={setCorrectLetter}
        setWrongLetter={setWrongLetter}
      />
    </div>
  );
};
export default Hangman;
