import React from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import "./footerbar.css";

function FooterBar() {
  return (
    <footer className="footer-main-div">
      <Container className="first-main-container px-sm-0 px-md-5 pb-2" fluid>
        <Row>
          <Col sm={12} md={3}>
            <Stack gap={2}>
              <div className="first-stack-first">Work@tion</div>
              <div className="first-stack-common">
                Pesto, Delhi, India, World
              </div>
              <div className="first-stack-common">Call @ 1800-1234-1234</div>
            </Stack>
          </Col>
        </Row>
        <Row>
          <Col sm={12} className="copyright-text">
            copyright&copy;2021. PESTO . Thanks to Unsplash.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export { FooterBar };
