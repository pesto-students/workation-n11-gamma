/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Button,
  FormControl,
  Spinner,
} from "react-bootstrap";
import "./landing.css";
import { Link } from "react-router-dom";
import firstvideo from "../shared-resource/videos/firstLandingVideo.mp4";
import secondVideo from "../shared-resource/videos/secondLandingVideo.mp4";
import { connect } from "react-redux";
import { withRouter } from "../shared-resource/store/withRouter";

function LandingPage(props) {
  const todayDate = new Date();
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 7);
  const [location, changeLocation] = useState("");
  const [fromDate, changeFromDate] = useState(
    todayDate.getFullYear() +
      "-" +
      parseInt(todayDate.getMonth() + 1) +
      "-" +
      todayDate.getDate()
  );
  const [toDate, changeToDate] = useState(
    nextDay.getFullYear() +
      "-" +
      parseInt(nextDay.getMonth() + 1) +
      "-" +
      nextDay.getDate()
  );
  const [budget, changeBudget] = useState(12000);

  useEffect(() => {
    props.loadLandingPageData();
  }, []);

  function searchPlaceOnBudget() {
    props.searchPlace({
      name: location,
      date: { from: fromDate, to: toDate },
      budget: budget,
    });
  }

  function changeBudgetOnScroll(e) {
    changeBudget(e.target.value);
  }

  function getLocation(e) {
    changeLocation(e.target.value);
  }

  function getChangeFromDate(e) {
    changeFromDate(e.target.value);
  }

  function getChangeToDate(e) {
    changeToDate(e.target.value);
  }

  useEffect(() => {}, [budget, location, fromDate, toDate]);
  return (
    <div className=" app-background main-landing-page">
      <Container className="landing-page-top-container" fluid>
        <Row>
          <Col sm={12}>Live the life better way, Explore with us</Col>
        </Row>
      </Container>
      <div className="landing-first-div">
        <Container className="landing-page-second-container" fluid>
          <Row>
            <Col sm={12}>
              <Container className="search-bar-landing" fluid>
                <Row className="search-landing-row">
                  <Col xs={12}>
                    <Form className="search-from-main">
                      <Row className="align-items-center">
                        <Col sm={3} className="my-1 px-5 d-flex flex-column">
                          <Form.Label
                            htmlFor="inlineFormInputName"
                            className="text-center search-label"
                          >
                            Location
                          </Form.Label>
                          <InputGroup className="location-input-group">
                            <InputGroup.Text className="location-input-text">
                              <i className="fa fa-map-pin"></i>
                            </InputGroup.Text>
                            {/* <Form.Control
                              id="inlineFormInputName"
                              className="input-location-box"
                              value={location}
                              placeholder=""
                              onChange={getLocation}
                            /> */}
                            <Form.Select
                              aria-label="Default select example"
                              className="input-location-box form-select dropdown"
                              onChange={getLocation}
                            >
                              <option value="" className="bg-dark">
                                Select location
                              </option>
                              {props.landing_page_data.data?.cityResult
                                ?.length &&
                                props.landing_page_data.data?.cityResult?.map(
                                  (_, idx) => {
                                    return (
                                      <option
                                        value={_.name}
                                        className="bg-dark"
                                      >
                                        {_.name}
                                      </option>
                                    );
                                  }
                                )}
                            </Form.Select>
                          </InputGroup>
                        </Col>

                        <Col sm={4} className="my-1 px-5 d-flex flex-column">
                          <Form.Label
                            htmlFor="location-date-group-id"
                            className="text-center search-label"
                          >
                            Dates
                          </Form.Label>
                          <div
                            id="location-date-group-id"
                            className="location-date-group"
                          >
                            <FormControl
                              id="inlineFormInputGroupDates1"
                              className="location-date-pick-class"
                              type="date"
                              value={fromDate}
                              onChange={getChangeFromDate}
                            />
                            <span className="d-flex flex-row justify-content-center align-items-center">
                              &nbsp;to&nbsp;
                            </span>
                            <FormControl
                              id="inlineFormInputGroupDates2"
                              className="location-date-pick-class"
                              type="date"
                              value={toDate}
                              onChange={getChangeToDate}
                            />
                          </div>
                        </Col>

                        <Col xs={2} className="my-1 px-5 d-flex flex-column">
                          <Form.Label
                            htmlFor="inlineFormInputGroupBudget"
                            className="text-center search-label"
                          >
                            Budget
                          </Form.Label>
                          <>
                            <Form.Range
                              min="0"
                              max="30000"
                              value={budget}
                              onChange={changeBudgetOnScroll}
                            />
                            <Form.Label className="d-flex flex-row justify-content-end ">
                              upto &nbsp;{budget}
                            </Form.Label>
                          </>
                        </Col>

                        <Col xs={3} className="my-1 px-5 d-flex flex-column">
                          <Form.Label
                            htmlFor="inlineFormInputButton"
                            className="text-center search-label"
                          >
                            <i className="fa fa-search fa-x" />
                          </Form.Label>
                          <Button
                            type="button"
                            id="inlineFormInputButton"
                            className="search-button-location"
                            variant="dark"
                            onClick={searchPlaceOnBudget}
                            title="Search"
                          >
                            Search
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>

          <Row className="gx-0">
            <Col sm={12} className="under-search-landing">
              Work like the comfort of your home and explore different cultures
              with our quality standard partners which will take care of all you
              needs for working from anywhere while not hammering your pocket
              get the subsidized stay at the best hotels in the towns so that
              you can stay longer and enjoy nature and culture.
            </Col>
          </Row>
          <Row className="gx-0 explore-top-location">
            <Col sm={12} className="mandates">
              Aman need to add mendates!
            </Col>
            <Col sm={12} className="explore-top-location-col">
              <Container className="explore-top-location-main-container" fluid>
                <Row className="gx-0">
                  <Col
                    sm={12}
                    className="location-main-container-first-row-col"
                  >
                    Explore Top Locations
                  </Col>
                </Row>
                <Row className="gx-0">
                  <Col
                    sm={12}
                    className="location-main-container-second-row-col"
                  >
                    <Row xs={1} sm={2} md={4} className="g-5">
                      {props.landing_page_data?.data &&
                      props.landing_page_data.data?.cityResult &&
                      props.landing_page_data.data?.cityResult?.length ? (
                        props?.landing_page_data?.data?.cityResult
                          ?.slice(0, 4)
                          ?.map((_, idx) => (
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
                      ) : props?.landing_page_data?.data?.cityResult?.length ===
                        0 ? null : (
                        <h5 className="text-white">
                          {`Please wait...`}
                          <Spinner animation="border" size="sm" />
                        </h5>
                      )}
                    </Row>
                  </Col>
                </Row>
                <Row className="gx-0">
                  <Col
                    sm={12}
                    className="location-main-container-third-row-col"
                  >
                    <Link
                      to="/customer/findcities"
                      className="explore-location-link"
                    >
                      {" "}
                      Explore More&nbsp;&gt;
                    </Link>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="landing-page-video-div">
        <Container className="landing-page-video-container" fluid>
          <Row className="landing-video-text-top g-0">
            <Col sm={12} className="landing-video-text-top-col">
              <p>DISCOVER THE</p>
              <p>WORLD IN A</p>
              <p>NEW WAY</p>
            </Col>
          </Row>
          <Row className="landing-video-text-middle g-0">
            <Col sm={12} className="landing-video-text-middle-col">
              <div>
                <Link to="#" className="video-link-text">
                  {" "}
                  &#9654;
                </Link>
              </div>
              <div>WATCH THE VIDEO</div>
            </Col>
          </Row>
          <Row className="landing-video-text-third g-0">
            <Col sm={5} className="landing-video-text-third-col-A">
              "Attachment to things and comfort is the main obstacle to the
              interesting life. People, as a rule, do not realize that at any
              time they can throw anything out of their lives. Anytime."
            </Col>
            <Col sm={7} className="landing-video-text-third-col-B">
              <Card className="landing-video-card">
                <video variant="top" className="landing-video " controls>
                  <source src={firstvideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Card>
              <Card className="landing-video-card">
                <video variant="top" className="landing-video " controls>
                  <source src={secondVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

// export {LandingPage};
const mapStatesToProps = (states, props) => {
  return {
    authorized_user_login: states.app.user,
    landing_page_data: states.app.landingPageData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchPlace: (data) =>
      dispatch({
        type: "IS_LANDING_SEARCH_AVAILABLE",
        payload: data,
      }),
    loadLandingPageData: () =>
      dispatch({
        type: "LOAD_LANDING_PAGE_DATA",
      }),
  };
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(LandingPage)
);
