import React from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import "./footerbar.css";

function FooterBar() {
  return (
    <div className="footer-main-div">
      <Container className="first-main-container" fluid>
        <Row>
          <Col md={3}>
            <Stack gap={2}>
              <div className="first-stack-first">Work@tion</div>
              <div className="first-stack-common">
                Pesto, Delhi, India, World
              </div>
              <div className="first-stack-common">Call @ 1800-1234-1234</div>
            </Stack>
          </Col>
          {/* <Col md={2}>
            <Stack gap={2}>
              <div className=" stack-common-heading">Tour</div>
              <div className="first-stack-common">Second item</div>
              <div className="first-stack-common">Third item</div>
              <div className="first-stack-common">Third item</div>
            </Stack>
          </Col>
          <Col md={2}>
            <Stack gap={2}>
              <div className="stack-common-heading">Company</div>
              <div className="first-stack-common">Second item</div>
              <div className="first-stack-common">Third item</div>
              <div className="first-stack-common">Third item</div>
            </Stack>
          </Col>
          <Col md={2}>
            <Stack gap={2}>
              <div className="stack-common-heading">Resource</div>
              <div className="first-stack-common">Second item</div>
              <div className="first-stack-common">Third item</div>
              <div className="first-stack-common">Third item</div>
            </Stack>
          </Col>
          <Col md={3}>
            <Stack gap={2}>
              <div className="stack-common-heading">More</div>
              <div className="first-stack-common">Second item</div>
              <div className="first-stack-common">Third item</div>
              <div className="first-stack-common">Third item</div>
            </Stack>
          </Col> */}
        </Row>
        <Row>
          <Col sm={12} className="copyright-text">
            copyright&copy;2021. PESTO . Thanks to Unsplash.
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export { FooterBar };
