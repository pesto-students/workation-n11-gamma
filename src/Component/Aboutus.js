import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { connect } from "react-redux";
import developerFirst from "../shared-resource/images/d1png.png";
import developerTwo from "../shared-resource/images/d2png.png";
import fundingone from "../shared-resource/images/funding1.jpg";
import fundingtwo from "../shared-resource/images/funding2.jpg";
import fundingthree from "../shared-resource/images/funding3.jpg";

import { withRouter } from "../shared-resource/store/withRouter";
import "./aboutus.css";

function AboutUs(props) {
  return (
    <section className=" aboutus-background main-aboutus-page">
      <Container className="aboutus-page-top-container" fluid>
        <Row>
          <Col sm={12}>Live the life better way, Explore with us</Col>
        </Row>
      </Container>

      <Container className="aboutus-page-second-container" fluid>
        <Row className="gx-0 explore-top-location-aboutus">
          <Col sm={12} className="explore-top-location-col">
            <Container className="explore-top-location-main-container" fluid>
              <Row className="gx-0">
                <Col sm={12} className="location-main-container-first-row-col">
                  Our Team
                </Col>
              </Row>

              <Row className="gx-0">
                <Col
                  sm={12}
                  className="location-main-container-second-row-col pt-5"
                >
                  <Row sm={12} className="g-0 w-100 ">
                    <div class="card mb-3 card-backgeound">
                      <div class="row g-0 border-none">
                        <div class="col-md-2">
                          <img
                            src={developerFirst}
                            class="img-fluid rounded-start first-image-class"
                            alt="..."
                          />
                        </div>
                        <div class="col-md-10">
                          <div class="card-body">
                            <h5 class="card-title">Rishabh Verma</h5>
                            <h6 class="card-text">Software Developer</h6>
                            <p class="card-text">
                              It is a long established fact that a reader will
                              be distracted by the readable content of a page
                              when looking at its layout. The point of using
                              Lorem Ipsum is that it has a more-or-less normal
                              distribution of letters, as opposed to using
                              'Content here, content here', making it look like
                              readable English.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <Row sm={12} className="g-0 w-100 ">
                    <div class="card mb-3 card-backgeound">
                      <div class="row g-0 border-none">
                        <div class="col-md-2">
                          <img
                            src={developerTwo}
                            class="img-fluid rounded-start first-image-class"
                            alt="..."
                          />
                        </div>
                        <div class="col-md-10">
                          <div class="card-body">
                            <h5 class="card-title">Aman Shah</h5>
                            <h6 class="card-text">Software Developer</h6>
                            <p class="card-text">
                              It is a long established fact that a reader will
                              be distracted by the readable content of a page
                              when looking at its layout. The point of using
                              Lorem Ipsum is that it has a more-or-less normal
                              distribution of letters, as opposed to using
                              'Content here, content here', making it look like
                              readable English.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>

                  <Row sm={12} className="g-0 w-100 ">
                    <Container className="aboutus-page-top-container" fluid>
                      <Row>
                        <Col sm={12}>Our Achievements / Funding</Col>
                      </Row>
                    </Container>
                    <Carousel>
                      <Carousel.Item interval={1000}>
                        <div className="carousel-image-div">
                          <img
                            className="d-block  achievements-carousel"
                            src={fundingone}
                            alt="First slide"
                          />
                        </div>
                        <Carousel.Caption>
                          <p>
                            Nulla vitae elit libero, a pharetra augue mollis
                            interdum.
                          </p>
                        </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item interval={500}>
                        <div className="carousel-image-div">
                          <img
                            className="d-block  achievements-carousel"
                            src={fundingtwo}
                            alt="Second slide"
                          />
                        </div>
                        <Carousel.Caption>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                          </p>
                        </Carousel.Caption>
                      </Carousel.Item>
                      <Carousel.Item>
                        <div className="carousel-image-div">
                          <img
                            className="d-block  achievements-carousel"
                            src={fundingthree}
                            alt="Third slide"
                          />
                        </div>
                        <Carousel.Caption>
                          <p className="">
                            Praesent commodo cursus magna, vel scelerisque nisl
                            consectetur.
                          </p>
                        </Carousel.Caption>
                      </Carousel.Item>
                    </Carousel>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

const mapStatesToProps = (states, props) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(AboutUs)
);
