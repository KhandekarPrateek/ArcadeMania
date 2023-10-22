import React, { useEffect, useState } from "react";

const Hints = ({ define, word }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const generator = setTimeout(() => {
      index < define.length - 1 ? setIndex((index) => index + 1) : setIndex(0);
    }, 5000);
    return () => clearInterval(generator);
  });
  const currentHint = define[index];
  return (
    <div>
      <h1>hints</h1>

      <h6>{currentHint}</h6>
      {console.log(currentHint, "curent hint")}
    </div>
  );
};

export default Hints;
