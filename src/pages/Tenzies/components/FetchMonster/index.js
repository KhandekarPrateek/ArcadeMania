import MonsterFace from "../MonsterFace";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

import RulesModal from "../../../../common/RulesModal";
//import Confetti from "react-confetti";
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
    console.log(monsterArray);
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
    for (let i = 0; i < 10; i++) {
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

  const diceElements = die.map((EveryDie) => (
    <MonsterFace
      key={EveryDie.id}
      value={EveryDie.value}
      status={EveryDie.isHeld}
      function={() => hold(EveryDie.id)}
      link={monsterArray[EveryDie.value]}
    />
  ));

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
    "Roll until all dice are the same. Click each die to freeze it at its current value between rolls";
  return (
    <div className="body-monster">
      <div className="main-monster">
        <h1 className="title-tenzies">TENZIES GAME</h1>
        {/* <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p> */}
        <RulesModal rules={rules} title="Tenzies" />
        <div className="dice-container">{diceElements}</div>

        <button className="roll-dice" onClick={handleClick}>
          {tenzies === true ? "New game" : "Roll"}
        </button>
      </div>
    </div>
  );
};

export default FetchMonster;
