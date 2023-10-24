import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
const Title = (props) => {
  const redirectButton = () => {
    window.location.href = "https://react.dev/learn";
  };
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
      <Row>
        <Col className=" d-flex justify-content-center p-3">
          <Button
            className="rounded border border-3"
            outline
            color="primary"
            onClick={redirectButton}
          >
            <h1 className="display 5 main-page-title">Learn React</h1>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Title;
