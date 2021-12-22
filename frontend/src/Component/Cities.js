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
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "../shared-resource/store/withRouter";
import "./cities.css";

function Cities(props) {
  const [from, ChangeFrom] = useState(0);
  const [to, ChangeTo] = useState(10);

  useEffect(() => {
    props.loadCitiesPageData(from, to);
  }, []);

  useEffect(() => {
    props.loadCitiesPageData(from, to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className=" cities-background main-cities-page">
      <Container className="cities-page-top-container" fluid>
        <Row>
          <Col sm={12}>Live the life better way, Explore with us</Col>
        </Row>
      </Container>
      <Container className="cities-page-second-container" fluid>
        <Row className="gx-0 explore-top-location-cities">
          <Col sm={12} className="explore-top-location-col">
            <Container className="explore-top-location-main-container" fluid>
              <Row className="gx-0">
                <Col sm={12} className="location-main-container-first-row-col ">
                  Our Locations
                </Col>
              </Row>
              <Row className="gx-0">
                <Row className="gx-0">
                  <Col
                    sm={6}
                    className="location-main-container-third-row-col d-flex flex-row justify-content-start"
                  >
                    Showing{" "}
                    {props.citiesPageData?.data?.totalCount === 0
                      ? 0
                      : from + 1}{" "}
                    to{" "}
                    {props.citiesPageData?.data?.totalCount < to
                      ? props.citiesPageData?.data?.totalCount
                      : to}{" "}
                    of {props.citiesPageData?.data?.totalCount}
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
                    {props.citiesPageData?.data &&
                    props.citiesPageData?.data?.cities &&
                    props.citiesPageData?.data?.cities?.length ? (
                      props.citiesPageData?.data?.cities.map((_, idx) => (
                        <Col key={idx}>
                          <Link
                            to={`/customer/city/${_.name}`}
                            className="text-white"
                          >
                            <Card className="location-cards p-0">
                              <Card.Img
                                variant="top"
                                src={_.image_url}
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
                      ))
                    ) : props.citiesPageData?.data?.cities?.length ===
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
  );
}

// export {LandingPage};
const mapStatesToProps = (states, props) => {
  return {
    citiesPageData: states.app.citiesPageData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCitiesPageData: (from, to) =>
      dispatch({
        type: "LOAD_CITIES_PAGE_DATA",
        payload: { from, to },
      }),
  };
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(Cities)
);
