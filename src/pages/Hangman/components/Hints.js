import React, { useEffect, useState } from "react";

const Hints = ({ define, word, lose, play }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const generator = setTimeout(() => {
      index < define.length - 1 ? setIndex((index) => index + 1) : setIndex(0);
    }, 5000);
    return () => clearInterval(generator);
  }, [index, define]);

  const currentHint = define[index];
  return (
    <div>
      {play ? (
        lose ? (
          <h1>The correct word is {word}</h1>
        ) : (
          <div>
            <h1 className="hangman--font justify-content-center d-flex ">
              Hints
            </h1>
            <h2 className="justify-content-center d-flex">{currentHint}</h2>
          </div>
        )
      ) : null}
    </div>
  );
};

export default Hints;
