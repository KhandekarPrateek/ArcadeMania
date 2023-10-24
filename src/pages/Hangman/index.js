import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import KeyboardEventHandler from "react-keyboard-event-handler";
import Figure from "./components/Figure";
import Word from "./components/Word";
import WrongLetters from "./components/WrongLetters";

import wordsArray from "./components/dataHangman";
import { Col, Container, Row, Button } from "reactstrap";
import Hints from "./components/Hints";
import RulesModal from "../../common/RulesModal";

const Hangman = () => {
  const extractedDefs = [];
  const randomWord =
    wordsArray[Math.floor(Math.random() * wordsArray.length)].toLowerCase();
  const hangmanRules =
    "Guess letters to uncover a secret word. Incorrect guesses result in drawing parts of a hangman. Fill in the word before the hangman is complete to win.";

  const [currentWord, setCurrentWord] = useState(randomWord);
  const [extractedDefinition, setExtractedDefinition] = useState([]);
  const [correctLetter, setCorrectLetter] = useState([]);
  const [wrongLetter, setWrongLetter] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [play, setPlay] = useState(true);
  const [lose, setLose] = useState(false);

  const wordLength = currentWord.split("");
  const wordLength1 = Array.from(new Set(wordLength));

  useEffect(() => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`)
      .then((res) => res.json())
      .then((data) => pushDefinition(data));
  }, [currentWord]);

  useEffect(() => {
    checkLosser();
    checkWinner();
  });

  setTimeout(() => {
    setShowNotification(false);
  }, 1000);

  const playAgain = () => {
    setCurrentWord(randomWord);
    setCorrectLetter([]);
    setWrongLetter([]);
    setLose(false);
    setPlay(true);
  };

  const pushDefinition = (jsonData) => {
    jsonData[0].meanings.forEach((meaning) => {
      meaning.definitions.forEach((definition) => {
        extractedDefs.push(definition.definition);
        setExtractedDefinition(extractedDefs);
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

  return (
    <Container className="hangman-body " fluid>
      <Row>
        <div className="display-2 d-flex justify-content-center hangman--font ">
          HANGMAN
        </div>
      </Row>
      <Row className="d-flex align-items-center h-100">
        <Col
          sm={3}
          xs={12}
          className="ps-5 justify-content-center align-items-center h-100 align-self-center d-flex flex-column"
        >
          <Hints
            define={extractedDefinition}
            word={currentWord}
            lose={lose}
            play={play}
          />
        </Col>
        <Col
          xs={12}
          sm={6}
          className=" h-100 align-self-start align-items-center d-flex flex-column justify-content-center "
        >
          <div className="hangman-glass p-5 ">
            <Row>
              <Figure wrong={wrongLetter} />
            </Row>
            <Row>
              <Word selectedWord={currentWord} correctLetter={correctLetter} />
            </Row>

            {wrongLetter.length < 7 && (
              <KeyboardEventHandler
                handleKeys={["alphabetic"]}
                onKeyEvent={(key, e) => handleKeyChange(key, e)}
              ></KeyboardEventHandler>
            )}
          </div>
          {showNotification === true && <>same</>}

          {play === false && <>YOU WON</>}

          {lose === true && <h1>YOU LOSE</h1>}
        </Col>
        <Col
          sm={3}
          xs={12}
          className=" justify-content-center  align-self-center d-flex flex-column h-100"
        >
          <Row>
            <WrongLetters wrong={wrongLetter} />
          </Row>

          <Row className="mb-5 me-5">
            <Button onClick={playAgain}>Start game</Button>
          </Row>
          <Row className="mt-5 me-5">
            <RulesModal color="secondary" title="Rules" rules={hangmanRules} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Hangman;
