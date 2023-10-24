import MonsterFace from "../MonsterFace";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

import RulesModal from "../../../../common/RulesModal";
import { Button, Col, Container, Row } from "reactstrap";
import Confetti from "react-confetti";
const FetchMonster = () => {
  const [die, setDie] = useState(NewDie());
  const [tenzies, setTenzies] = useState(false);
  const [monsterArray, setMonsterArray] = useState([]);
  const api = () => {
    const monsterArray = [];
    for (let i = 0; i <= 6; i++) {
      monsterArray.push(`https://robohash.org/${i}?set=set2`);
    }
    setMonsterArray(monsterArray);
  };
  useEffect(() => {
    api();
  }, []);

  useEffect(() => {
    const allHeld = die.every((die) => die.isHeld);

    const firstValue = die[0].value;

    const allValue = die.every((die) => die.value === firstValue);
    if (allValue && allHeld) {
      setTenzies(true);
    }
  }, [die]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function NewDie() {
    const dice = [];
    for (let i = 0; i < 12; i++) {
      dice.push(generateNewDie());
    }
    return dice;
  }

  function hold(id) {
    setDie((oldDie) =>
      oldDie.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  function handleClick() {
    if (tenzies === false) {
      setDie((oldDie) =>
        oldDie.map((die) => {
          return die.isHeld === true ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDie(NewDie());
    }
  }

  const rules =
    "Roll until all Monster faces are the same. Click each face to freeze it at its current value between rolls";
  return (
    <Container className="body-monster " fluid>
      {tenzies && <Confetti />}
      <Container className="main-monster" fluid>
        <Row>
          <h1 className="title-tenzies pb-2 ">TENZIES GAME</h1>
        </Row>
        <Row className="pb-4 justify-content-center d-flex flex-column">
          <RulesModal rules={rules} title="Tenzies" />
        </Row>
        <Row className="w-100 mb-5" sm={12}>
          {die.map((EveryDie) => (
            <Col key={EveryDie.id} className="dice-container" sm={2}>
              <MonsterFace
                value={EveryDie.value}
                status={EveryDie.isHeld}
                function={() => hold(EveryDie.id)}
                link={monsterArray[EveryDie.value]}
              />
            </Col>
          ))}
        </Row>

        <Row>
          <Button className="roll-dice " onClick={handleClick}>
            {tenzies === true ? "New game" : "Roll"}
          </Button>
        </Row>
      </Container>
    </Container>
  );
};

export default FetchMonster;
