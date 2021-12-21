/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../shared-resource/store/withRouter";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import "./find_city.css";

function HotelAvailable(props) {
  const city = useParams();

  useEffect(() => {
    props.getHotelDetails(city.id);
  }, []);
  const info = props?.hotelDetails?.data && props?.hotelDetails?.data[0];
  console.log(info);
  return (
    <div className="place-main-div">
      <Container className="top-container" fluid>
        <Row className="gx-0">
          <Col className="top-div">
            <Container className="second-container" fluid>
              <Row className="gx-5">
                <Col sm={7}>
                  <div className="city-name">{info?.name}</div>
                  <div className="hotel-city">
                    {info?.city}
                    {info?.city ? `, India` : null}
                  </div>
                  <div className="hotel-type">{info?.placeType}</div>
                  <div className="city-description">{info?.description}</div>
                  <div className="pt-4" col={12}>
                    <Form className="booking-form">
                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridCheckIn">
                          <Form.Label className="booking-fileds-label">
                            Check In
                          </Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          sm={1}
                          controlId="formGridCheckArrow"
                          className="d-flex flex-column align-items-center align-self-center"
                        >
                          &rarr;
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCheckOut">
                          <Form.Label className="booking-fileds-label">
                            Check Out
                          </Form.Label>
                          <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridTotalDays">
                          <Form.Label className="booking-fileds-label">
                            Total Days
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="total-days-booking"
                            value="11"
                            disabled
                          />
                        </Form.Group>
                      </Row>

                      <Form.Group className="mb-3" controlId="formGridAmount">
                        <Form.Label className="booking-fileds-label">
                          Amount
                        </Form.Label>
                        <Form.Control type="text" value={info?.price} />
                      </Form.Group>

                      <Button
                        variant="primary"
                        type="button"
                        className="booking-fileds-button"
                      >
                        Book the experience
                      </Button>
                    </Form>
                  </div>
                </Col>
                <Col sm={5}>
                  <div className="place-map d-none">
                    <h6>Map Coordinates</h6>
                    {info?.placeLocation?.Latitude +
                      "/" +
                      info?.placeLocation?.Longitude}
                  </div>
                  <div className="nomads-uploads">
                    {/* {info?.nomadsUpload?.map((images) => {
                      return <div className="">{images.toString()}</div>;
                    })} */}
                    <Card className="location-cards p-0">
                      <Card.Img
                        variant="top"
                        src={info?.hotel_image}
                        className="location-card-image m-0"
                      />
                    </Card>
                  </div>
                </Col>
              </Row>

              <Row className="gx-0 minimum-budget-row">
                <Container>
                  <Row>
                    <Col sm={12} className="minimum-budget-line">
                      {`Find the best stay in ${info?.name} in minimum budget`}
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <Row xs={1} sm={2} md={4} className="g-5">
                        {info?.hotelsList?.map((_, idx) => (
                          <Col key={idx}>
                            <Link
                              to={`/customer/hotel/${_.id}`}
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
                                    {_.name}
                                  </Card.Title>
                                </Card.Body>
                              </Card>
                            </Link>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStatesToProps = (states, props) => {
  return {
    hotelDetails: states.app.customerHotelDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getHotelDetails: (hotel_id) =>
      dispatch({
        type: "GET_HOTEL_DETAILS_CUSTOMER",
        payload: hotel_id,
      }),
  };
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(HotelAvailable)
);
