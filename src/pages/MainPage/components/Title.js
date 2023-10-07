import React from "react";
import { Container, Row, Col } from "reactstrap";
const Title = (props) => {
  return (
    <Container>
      <Row>
        <Col className="text-center p-3">
          <h1 className="main-page-title display-1">{props.text}</h1>
        </Col>
      </Row>
      <Row>
        <Col className="p-3">
          <h1 className="display 5 main-page-title">
            A interactive gaming site made using Reactjs
          </h1>
        </Col>
      </Row>
    </Container>
  );
};

export default Title;
