import React, { useEffect, useState } from "react";

const Hints = (props) => {
  const [index, setIndex] = useState(0);
  const def = props.define;
  const answer = props.word;

  useEffect(() => {
    const generator = setTimeout(() => {
      setIndex((index) => (index + 1) % def.length);
    }, 2000);
    return () => clearInterval(generator);
  }, [def.length]);
  const currentHint = def[index];
  return (
    <div>
      <h1>hints</h1>

      <h6>{currentHint}</h6>
      {console.log(currentHint, "curent hint")}
    </div>
  );
};

export default Hints;
