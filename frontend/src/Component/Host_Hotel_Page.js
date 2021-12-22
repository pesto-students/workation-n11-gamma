/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
// import {userContext} from "../shared-resource/Contexts/User_Context"
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import "./host_landing_page.css";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "../shared-resource/store/withRouter";

function HostHotelPage(props) {
  const urlParams = useParams();
  useEffect(() => {
    props.loadHostHotelPageData(urlParams.hotelId);
  }, []);

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  }
  return (
    <div className=" app-hLanding-background main-hLanding-page">
      <Container className="hLanding-page-top-container" fluid>
        <Row>
          <Col sm={12}>All hotel Details will come here!</Col>
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
                    Your Bookings
                  </Col>
                </Row>

                <Row className="gx-0">
                  <Col
                    sm={12}
                    className="hLanding-main-container-second-row-col"
                  >
                    <Row className="gx-0 d-none">
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
                    <Row xs={1} sm={2} md={4} className="g-5">
                      {props.hotel_page_data?.bookings?.length ? (
                        props.hotel_page_data.bookings.map((_, idx) => (
                          <Col key={idx}>
                            <Link to={`/${_.id}`} className="text-white">
                              <Card className="host-hotel-cards p-0">
                                <Card.Body className="location-card-body">
                                  <Card.Title className="location-card-title">
                                    {"Price: "}
                                    {_?.data?.amount}
                                  </Card.Title>
                                  <Card.Title className="location-card-title">
                                    {"Checking: "}
                                    {secondsToHms(_?.data?.checkin?._seconds)}
                                  </Card.Title>
                                  <Card.Title className="location-card-title">
                                    {"Checkout: "}
                                    {secondsToHms(_?.data?.checkout?._seconds)}
                                  </Card.Title>
                                </Card.Body>
                              </Card>
                            </Link>
                          </Col>
                        ))
                      ) : props.hotel_page_data?.bookings?.length ===
                        0 ? null : (
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
    hotel_page_data: states.app.hostHotelsPageData?.data?.hotel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadHostHotelPageData: (hotelId) =>
      dispatch({
        type: "LOAD_HOST_HOTEL_PAGE_DATA",
        payload: { hotelId },
      }),
  };
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(HostHotelPage)
);
