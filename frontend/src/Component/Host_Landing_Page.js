/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { userContext } from "../shared-resource/Contexts/User_Context";
// import {userContext} from "../shared-resource/Contexts/User_Context"
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import "./host_landing_page.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "../shared-resource/store/withRouter";

function HostLandingPage(props) {
  const userData = useContext(userContext);
  useEffect(() => {
    props.loadLandingPageData(userData.userId);
  }, []);

  return (
    <div className=" app-hLanding-background main-hLanding-page">
      <Container className="hLanding-page-top-container" fluid>
        <Row>
          <Col sm={12}>Help us to make a better world!</Col>
        </Row>
      </Container>
      <div className="hLanding-first-div">
        <Container className="hLanding-page-second-container" fluid>
          <Row className="gx-0 explore-top-hLanding">
            <Col sm={12} className="explore-top-hLanding-col">
              <Container className="explore-top-hLanding-main-container" fluid>
                <Row className="gx-0">
                  <Col
                    sm={12}
                    className="hLanding-main-container-first-row-col"
                  >
                    Your hotels
                  </Col>
                </Row>
                <Row className="gx-0">
                  <Col
                    sm={12}
                    className="location-main-container-third-row-col"
                  >
                    <Button className="explore-location-link">
                      {" "}
                      Include More&nbsp;&#x2B;
                    </Button>
                  </Col>
                </Row>
                <Row className="gx-0">
                  <Col
                    sm={12}
                    className="hLanding-main-container-second-row-col"
                  >
                    <Row xs={1} sm={2} md={4} className="g-5">
                      {props.landing_page_data?.data &&
                      props.landing_page_data.data?.length ? (
                        props.landing_page_data.data.map((_, idx) => (
                          <Col key={idx}>
                            <Link
                              to={`/host/hotel/${_.id}`}
                              className="text-white"
                            >
                              <Card className="location-cards p-0">
                                <Card.Img
                                  variant="top"
                                  src={_.data.hotel_image}
                                  className="location-card-image m-0"
                                />
                                <Card.Body className="location-card-body">
                                  <Card.Title className="location-card-title">
                                    {" "}
                                    {_.data.name}
                                  </Card.Title>
                                  <Card.Title className="location-card-title">
                                    {" "}
                                    {_.data.city}
                                  </Card.Title>
                                </Card.Body>
                              </Card>
                            </Link>
                          </Col>
                        ))
                      ) : (
                        <h5 className="text-white">
                          {`Please wait...`}
                          <Spinner animation="border" size="sm" />
                        </h5>
                      )}
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

const mapStatesToProps = (states, props) => {
  return {
    landing_page_data: states.app.hostLandingPageData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadLandingPageData: (userId) =>
      dispatch({
        type: "LOAD_HOST_LANDING_PAGE_DATA",
        payload: userId,
      }),
  };
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(HostLandingPage)
);
