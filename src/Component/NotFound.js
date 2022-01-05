import React from "react";
import { Container, Row, Col, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import notfound from "../shared-resource/images/not-found.jpg";
import "./notfound.css";

function NotFound() {
  return (
    <section className="dnd-main-div p-0 m-0">
      <Container className="main-container-dnd p-0 m-0" fluid>
        <Row className="g-0 p-0 m-0">
          <Col sm={12} className="p-0 m-0">
            <Figure className="p-0 m-0 figure-div">
              <Figure.Image
                className="p-0 m-0 figure-img"
                alt="171x180"
                src={notfound}
              />
              <div className="notfoundtopdiv">
                <p className="Not-found-text">
                  404! NOT FOUND <Link className="missing-path" to="/"></Link>
                </p>
              </div>
            </Figure>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export { NotFound };
