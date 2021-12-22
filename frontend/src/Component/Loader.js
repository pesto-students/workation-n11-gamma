/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "./Loader.css";

export default function Loader(props) {
  return (
    <Container className="Loading-spinner" fluid>
      <Row className="gx-0">
        <Col sm={12} className="col-spinner">
          <Spinner animation="border" variant="white" size="lg" />
        </Col>
      </Row>
    </Container>
  );
}
