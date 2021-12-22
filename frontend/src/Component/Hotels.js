/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Pagination,
  Spinner,
} from "react-bootstrap";
import "./hotels.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "../shared-resource/store/withRouter";

function Hotels(props) {
  const [from, ChangeFrom] = useState(0);
  const [to, ChangeTo] = useState(10);

  useEffect(() => {
    props.loadHotelPageData(from, to);
  }, []);

  useEffect(() => {
    props.loadHotelPageData(from, to);
  }, [from, to]);

  function moveBack() {
    ChangeFrom(from - 10);
    ChangeTo(to - 10);
  }

  function moveForward() {
    ChangeFrom(from + 10);
    ChangeTo(to + 10);
  }

  return (
    <div className=" hotels-background main-hotels-page">
      <Container className="hotels-page-top-container" fluid>
        <Row>
          <Col sm={12}>Live the life better way, Explore with us</Col>
        </Row>
      </Container>
      <Container className="hotels-page-second-container" fluid>
        <Row className="gx-0 explore-top-location-hotels">
          <Col sm={12} className="explore-top-location-col">
            <Container className="explore-top-location-main-container" fluid>
              <Row className="gx-0">
                <Col sm={12} className="location-main-container-first-row-col">
                  Our Hotels
                </Col>
              </Row>
              <Row className="gx-0">
                <Row className="gx-0">
                  <Col
                    sm={6}
                    className="location-main-container-third-row-col d-flex flex-row justify-content-start"
                  >
                    Showing {from + 1} to{" "}
                    {props.hotelsPageData?.data?.totalCount < to
                      ? props.hotelsPageData?.data?.totalCount
                      : to}{" "}
                    of {props.hotelsPageData?.data?.totalCount}
                  </Col>
                  <Col sm={6} className="location-main-container-third-row-col">
                    <Pagination>
                      {from < 10 ? null : (
                        <Pagination.Prev onClick={moveBack} />
                      )}
                      <Pagination.Next onClick={moveForward} />
                    </Pagination>
                  </Col>
                </Row>
                <Col sm={12} className="location-main-container-second-row-col">
                  <Row xs={1} sm={2} md={4} className="g-5">
                    {props.hotelsPageData?.data &&
                    props.hotelsPageData?.data?.hotels &&
                    props.hotelsPageData?.data?.hotels?.length ? (
                      props.hotelsPageData?.data?.hotels.map((_, idx) => (
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
                                  {_.hotel_name}
                                </Card.Title>
                                <Card.Title className="location-card-title-location">
                                  {" "}
                                  {_.city}
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
  );
}

// export {LandingPage};
const mapStatesToProps = (states, props) => {
  return {
    hotelsPageData: states.app.hotelsPageData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadHotelPageData: (from, to) =>
      dispatch({
        type: "LOAD_HOTELS_PAGE_DATA",
        payload: { from, to },
      }),
  };
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(Hotels)
);
