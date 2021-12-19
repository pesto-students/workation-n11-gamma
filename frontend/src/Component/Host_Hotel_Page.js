/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
// import {userContext} from "../shared-resource/Contexts/User_Context"
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./host_landing_page.css";
import { useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "../shared-resource/store/withRouter";

function HostHotelPage(props) {
  const urlParams = useParams();
  useEffect(() => {
    props.loadHostHotelPageData(urlParams.hotelId);
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
                    Your Booking
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
                      props.landing_page_data.data?.ownerResult &&
                      props.landing_page_data.data?.ownerResult?.length ? (
                        props.landing_page_data.data.ownerResult.map(
                          (_, idx) => (
                            <Col key={idx}>
                              <Link
                                to={`/host/hotel/${_.id}`}
                                className="text-white"
                              >
                                <Card className="location-cards p-0">
                                  <Card.Img
                                    variant="top"
                                    src={_.hotel_image}
                                    className="location-card-image m-0"
                                  />
                                  <Card.Body className="location-card-body">
                                    <Card.Title className="location-card-title">
                                      {" "}
                                      {_.hotel_name}
                                    </Card.Title>
                                    <Card.Title className="location-card-title">
                                      {" "}
                                      {_.city}
                                    </Card.Title>
                                  </Card.Body>
                                </Card>
                              </Link>
                            </Col>
                          )
                        )
                      ) : (
                        <> Loading...spinner</>
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
