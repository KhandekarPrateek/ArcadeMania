import React from "react";

import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Input } from "reactstrap";

import html2canvas from "html2canvas";
import Base64Downloader from "react-base64-downloader";

const FetchMeme = () => {
  const [imageSS, setImageSS] = useState("");
  const [memeInfo, setMemeInfo] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allData, setAllData] = useState({});
  const imageRef = useRef(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllData(data.data.memes));
  }, []);
  const printDocument = async () => {
    const canvas = await html2canvas(imageRef.current, {
      useCORS: true,
    });
    const image = canvas.toDataURL("meme.png");
    const imagestring = image.toString();
    setImageSS(imagestring);
  };
  useEffect(() => {
    printDocument();
  }, [memeInfo]);
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
  return (
    <Container className="meme-page-container">
      <Row className=" w-100 h-100">
        <Col
          className="justify-content-center d-flex p-5 h-100 align-items-center "
          sm={6}
          xs={12}
        >
          <div className="w-75 h-100 border border-5   meme-form">
            <Row>
              <div className="p-5">
                <h6>Top Text</h6>
                <Input
                  type="text"
                  placeholder="upper field"
                  className="form--input"
                  name="topText"
                  onChange={handleChange}
                  value={memeInfo.topText}
                />
              </div>
            </Row>
            <Row>
              <div className="p-5">
                <h6>Bottom Text</h6>
                <Input
                  type="text"
                  placeholder="lower field"
                  className="form--input"
                  name="bottomText"
                  onChange={handleChange}
                  value={memeInfo.bottomText}
                />
              </div>
            </Row>
            <Row>
              <div className="justify-content-center d-flex p-5">
                <Button className="Download-button" onClick={handleClick}>
                  Insert a new meme
                </Button>
              </div>
            </Row>
            <Row>
              <div className="justify-content-center d-flex p-5">
                <Base64Downloader
                  onClick={printDocument}
                  base64={imageSS}
                  downloadName="meme"
                  className="Download-button"
                >
                  Download the meme
                </Base64Downloader>
              </div>
            </Row>
          </div>
        </Col>

        <Col
          className="justify-content-center align-items-center d-flex  "
          sm={6}
          xs={12}
        >
          <div className="meme">
            <div ref={imageRef}>
              <h2 className="meme--text meme-top">{memeInfo.topText}</h2>
              <img
                src={memeInfo.randomImage}
                alt="memes to be pulled"
                className="meme--image"
              />

              <h2 className="meme--text-down meme-bottom  ">
                {memeInfo.bottomText}
              </h2>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default FetchMeme;
