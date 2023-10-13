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

  return (
    <Container className="meme-page-container">
      <Row className=" w-100 h-100">
        <div className="p-5  h-100 w-50  align-items-center d-flex">
          <Col className="justify-content-center d-flex">
            <div className="w-75 h-100 border border-5   meme-form">
              <Row>
                <div className="p-5">
                  <Input
                    type="text"
                    placeholder="upper field"
                    className="form--input"
                    name="topText"
                    onChange={handleChange}
                    value={memeInfo.topText}
                  />
                </div>{" "}
              </Row>
              <Row>
                <div className="p-5">
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
                    {" "}
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
                    {/* <Button className="Download-button" outline> */}
                    Download the meme
                    {/* </Button> */}
                  </Base64Downloader>
                </div>
              </Row>
            </div>
          </Col>
        </div>
        <div className="h-100 w-50 justify-content-center align-items-center d-flex  ">
          <Col>
            <div className="meme" ref={imageRef}>
              <h2 className="meme--text meme-top">{memeInfo.topText}</h2>
              <img
                src={memeInfo.randomImage}
                alt="memes to be pulled"
                className="meme--image"
              />

              <h2 className="meme--text meme-bottom">{memeInfo.bottomText}</h2>
            </div>
          </Col>
        </div>
      </Row>
    </Container>
  );
};
export default FetchMeme;
