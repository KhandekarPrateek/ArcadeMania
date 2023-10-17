import React, { useEffect } from "react";
import { useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import Figure from "./components/Figure";
import Word from "./components/Word";
import WrongLetters from "./components/WrongLetters";

import wordsArray from "./components/dataHangman";

const Hangman = () => {
  const randomWord =
    wordsArray[Math.floor(Math.random() * wordsArray.length)].toLowerCase();
  const [currentWord, setCurrentWord] = useState(randomWord);
  const [correctLetter, setCorrectLetter] = useState([]);
  const [wrongLetter, setWrongLetter] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const playAgain = () => {
    setCurrentWord(randomWord);
    setCorrectLetter([]);
    setWrongLetter([]);
    setLose(false);
    setPlay(true);
  };

  useEffect(() => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`)
      .then((res) => res.json())
      .then((data) => displayFunc(data));
  }, [currentWord]);
  const displayFunc = (jsonData) => {
    jsonData[0].meanings.forEach((meaning) => {
      meaning.definitions.forEach((definition) => {
        console.log("Definition: ", definition.definition, currentWord);
      });
    });
  };

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
    wrongLetter.length === 6 && setLose(true);
  };
  useEffect(checkLosser);
  useEffect(checkWinner);

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

      <div>
        {play === false && <h1>YOU WON</h1>}
        {(play === false || lose === true) && (
          <button onClick={playAgain}>Start another game</button>
        )}
        {lose === true && <h1>YOU LOSE</h1>}
      </div>
    </div>
  );
};
export default Hangman;
