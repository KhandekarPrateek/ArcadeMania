import React, { useEffect } from "react";
import { useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import Figure from "./components/Figure";
import Word from "./components/Word";
import WrongLetters from "./components/WrongLetters";
import Status from "./components/Status";
import wordsArray from "./components/dataHangman";

const Hangman = () => {
  const randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];

  useEffect(() => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`)
      .then((res) => res.json())
      .then((data) => printFunc(data));
  }, []);
  const printFunc = (jsonData) => {
    jsonData[0].meanings.forEach((meaning) => {
      meaning.definitions.forEach((definition) => {
        console.log("Definition: " + definition.definition, randomWord);
      });
    });
  };

  const [currentWord, setCurrentWord] = useState(randomWord);
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
    <div className="hangman-body">
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
        words={wordsArray}
        setCorrectLetter={setCorrectLetter}
        setWrongLetter={setWrongLetter}
      />
    </div>
  );
};
export default Hangman;
