import React from "react";
import Image from "../MainPage/components/Image";
import Title from "./components/Title";
import { Container, Row, Col } from "reactstrap";
import Game from "../../assets/background-mainpage-left.png";
const index = () => {
  return (
    <Container className="main-page-container">
      <Row className="h-100 ">
        <Col className="align-items-center d-flex justify-content-center">
          <Image image={Game} />
        </Col>
        <Col className="align-items-center d-flex justify-content-center">
          <Title text="Arcade Mania" />
        </Col>
      </Row>
    </Container>
  );
};

export default index;
