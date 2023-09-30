import React from "react";

import { useState, useEffect } from "react";

const FetchMeme = () => {
  const [memeInfo, setMemeInfo] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allData, setAllData] = useState({});

  function handleClick() {
    const randomNumber = Math.floor(Math.random() * allData.length);
    const randomMeme = allData[randomNumber].url;
    setMemeInfo((prevmemeInfo) => ({
      ...prevmemeInfo,
      randomImage: randomMeme,
    }));
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setMemeInfo((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllData(data.data.memes));
  }, []);

  console.log(allData);
  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="upper field"
          className="form--input"
          name="topText"
          onChange={handleChange}
          value={memeInfo.topText}
        />
        <input
          type="text"
          placeholder="lower field"
          className="form--input"
          name="bottomText"
          onChange={handleChange}
          value={memeInfo.bottomText}
        />
        <button className="form--button" onClick={handleClick}>
          {" "}
          Insert a new meme
        </button>
      </div>
      <div className="meme">
        <h2 className="meme--text top">{memeInfo.topText}</h2>
        <img
          src={memeInfo.randomImage}
          alt="memes to be pulled"
          className="meme--image"
        />

        <h2 className="meme--text bottom">{memeInfo.bottomText}</h2>
      </div>
    </main>
  );
};
export default FetchMeme;
