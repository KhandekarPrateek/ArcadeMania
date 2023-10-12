import React from "react";

import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "reactstrap";

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
    console.log(imagestring, "imagestring");
    // console.log("canvas", canvas);
    setImageSS(imagestring);
  };
  useEffect(() => {
    printDocument();
  }, [memeInfo]);

  return (
    <Container className="meme-page-container">
      <Row className=" w-100 h-100">
        <Col>
          <div className="form-memes ">
            <Row>
              {" "}
              <input
                type="text"
                placeholder="upper field"
                className="form--input"
                name="topText"
                onChange={handleChange}
                value={memeInfo.topText}
              />
            </Row>
            <Row>
              <input
                type="text"
                placeholder="lower field"
                className="form--input"
                name="bottomText"
                onChange={handleChange}
                value={memeInfo.bottomText}
              />
            </Row>
            <Row>
              <div className="justify-content-center d-flex">
                <Button color="info" outline onClick={handleClick}>
                  {" "}
                  Insert a new meme
                </Button>
              </div>
            </Row>
            <Row>
              <div>
                <Button>Download the meme</Button>
              </div>
              <div>
                <Base64Downloader
                  onClick={printDocument}
                  base64={imageSS}
                  downloadName="meme"
                >
                  Click to download
                </Base64Downloader>
              </div>
            </Row>
          </div>
        </Col>
        <Col className="justify-content-center align-item-center d-flex ">
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
      </Row>
    </Container>
  );
};
export default FetchMeme;
//const table = document.getElementById("table-container");
// html2canvas(imageRef.current).then(function (canvas) {
//   const link = document.createElement("a");
//   link.download = "meme.png";
//   link.href = canvas.toDataURL("image/png");
//   link.click();
// });
// console.log(imageRef.current, "ref value");
