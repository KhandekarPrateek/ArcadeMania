import React, { useEffect } from "react";
import { useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import Figure from "./components/Figure";
import Word from "./components/Word";
import WrongLetters from "./components/WrongLetters";

import wordsArray from "./components/dataHangman";
import { Col, Container, Row, Button } from "reactstrap";
import Hints from "./components/Hints";

const Hangman = () => {
  const randomWord =
    wordsArray[Math.floor(Math.random() * wordsArray.length)].toLowerCase();
  const [currentWord, setCurrentWord] = useState(randomWord);
  const [extractedDefinition, setExtractedDefinition] = useState([]);
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
  const extractedDefs = [];
  const displayFunc = (jsonData) => {
    jsonData[0].meanings.forEach((meaning) => {
      meaning.definitions.forEach((definition) => {
        extractedDefs.push(definition.definition);

        setExtractedDefinition(extractedDefs);
      });
    });
  };
  // console.log(extractedDefinition);
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
  const hangmanRules =
    "Guess letters to uncover a secret word. Incorrect guesses result in drawing parts of a hangman. Fill in the word before the hangman is complete to win.";
  return (
    <Container className="hangman-body" fluid>
      <Row className="h-100 ">
        <Col sm={3} className=" h-50 align-self-center d-flex flex-column">
          <h1 className="pb-5 ">Rules</h1>

          <p className="h2 pt-5 ">{hangmanRules}</p>
        </Col>
        <Col
          sm={6}
          className=" h-75 align-self-center align-items-center d-flex flex-column justify-content-center"
        >
          <Row className="display-2 d-flex align-items-start ">HANGMAN</Row>
          <Row>
            <Figure wrong={wrongLetter} />
          </Row>
          <Row>
            <Word selectedWord={currentWord} correctLetter={correctLetter} />
          </Row>
          <Hints define={extractedDefinition} />
          {wrongLetter.length < 7 && (
            <KeyboardEventHandler
              handleKeys={["alphabetic"]}
              onKeyEvent={(key, e) => handleKeyChange(key, e)}
            ></KeyboardEventHandler>
          )}

          {showNotification === true && <>same</>}

          {play === false && <>YOU WON</>}

          {lose === true && <h1>YOU LOSE</h1>}
        </Col>
        <Col
          sm={3}
          className=" justify-content-center align-items-center align-self-center d-flex flex-column h-50"
        >
          <WrongLetters wrong={wrongLetter} className="mb-5" />
          {(play === false || lose === true) && (
            <Button className="mt-5" outline onClick={playAgain}>
              Start another game
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default Hangman;
