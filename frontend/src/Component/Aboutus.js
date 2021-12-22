/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { connect } from "react-redux";
import imagefirst from "../shared-resource/images/alessio-furlan-Vw3a0HgE7AM-unsplash.jpg";
import { withRouter } from "../shared-resource/store/withRouter";
import "./aboutus.css";

function AboutUs(props) {
  return (
    <div className=" aboutus-background main-aboutus-page">
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
                    <div className="card mb-3 card-backgeound">
                      <div className="row g-0 border-none">
                        <div className="col-md-2">
                          <img
                            src={imagefirst}
                            className="img-fluid rounded-start first-image-class"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-10">
                          <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                              This is a wider card with supporting text below as
                              a natural lead-in to additional content. This
                              content is a little bit longer.
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                Last updated 3 mins ago
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <Row sm={12} className="g-0 w-100 ">
                    <div className="card mb-3 card-backgeound">
                      <div className="row g-0 border-none">
                        <div className="col-md-2">
                          <img
                            src={imagefirst}
                            className="img-fluid rounded-start first-image-class"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-10">
                          <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                              This is a wider card with supporting text below as
                              a natural lead-in to additional content. This
                              content is a little bit longer.
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                Last updated 3 mins ago
                              </small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <Row sm={12} className="g-0 w-100 ">
                    <div className="card mb-3 card-backgeound">
                      <div className="row g-0 border-none">
                        <div className="col-md-2">
                          <img
                            src={imagefirst}
                            className="img-fluid rounded-start first-image-class"
                            alt="..."
                          />
                        </div>
                        <div className="col-md-10">
                          <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">
                              This is a wider card with supporting text below as
                              a natural lead-in to additional content. This
                              content is a little bit longer.
                            </p>
                            <p className="card-text">
                              <small className="text-muted">
                                Last updated 3 mins ago
                              </small>
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
                            src={imagefirst}
                            alt="First slide"
                          />
                        </div>
                        <Carousel.Caption>
                          <h3>Seed Funding 1</h3>
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
                            src={imagefirst}
                            alt="Second slide"
                          />
                        </div>
                        <Carousel.Caption>
                          <h3>Seed Funding 2</h3>
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
                            src={imagefirst}
                            alt="Third slide"
                          />
                        </div>
                        <Carousel.Caption>
                          <h3>Seed Funding 3</h3>
                          <p>
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
    </div>
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
