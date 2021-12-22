/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../shared-resource/store/withRouter";
import { useParams, useLocation, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Badge,
  InputGroup,
  Button,
} from "react-bootstrap";
import queryString from "query-string";
import "./find_city.css";

function FindCity(props) {
  const city = useParams();
  const queryLocation = useLocation();
  const queries = queryString.parse(queryLocation.search);
  const [searchParams] = useState({ ...queries, city: city?.cityName });
  const [subArea, changeSubArea] = useState("");
  const [budgetPrice, changeBudgetPrice] = useState(13000);
  const [requiredRooms, changeRequiredRooms] = useState(1);
  const [requiredBeds, changeRequiredBeds] = useState(1);
  const [requiredBaths, changeRequiredBaths] = useState(1);
  const [facilityRequired, changeFacilityRequired] = useState([]);

  useEffect(() => {
    props.getPlaceDetails(searchParams);
  }, []);

  useEffect(() => {}, [
    subArea,
    budgetPrice,
    requiredBeds,
    requiredRooms,
    requiredBaths,
  ]);

  useEffect(() => {}, [props.customer_searched_place]);

  function changeTheSubArea(e) {
    changeSubArea(e.target.value);
  }

  function changeTheBudgetPrice(e) {
    changeBudgetPrice(e.target.value);
  }

  function changeTheRequiredRooms(value) {
    if (requiredRooms === 1 && value === "decrease") {
      return;
    }
    if (value === "decrease") {
      changeRequiredRooms(requiredRooms - 1);
    }
    if (value === "increase") {
      changeRequiredRooms(requiredRooms + 1);
    }
  }

  function changeTheRequiredBaths(value) {
    if (requiredBaths === 1 && value === "decrease") {
      return;
    }
    if (value === "decrease") {
      changeRequiredBaths(requiredBaths - 1);
    }
    if (value === "increase") {
      changeRequiredBaths(requiredBaths + 1);
    }
  }

  function changeTheRequiredBeds(value) {
    if (requiredBeds === 1 && value === "decrease") {
      return;
    }
    if (value === "decrease") {
      changeRequiredBeds(requiredBeds - 1);
    }
    if (value === "increase") {
      changeRequiredBeds(requiredBeds + 1);
    }
  }

  function addOrRemoveFacility(e) {
    const value = e.target.value;
    if (e.target.checked) {
      changeFacilityRequired((prevValue) => {
        const newList = [...prevValue, value];
        return newList;
      });
    }
    if (!e.target.checked) {
      changeFacilityRequired((prevValue) => {
        const isAlreadyPresent = prevValue.indexOf(value) >= 0;
        let newList;
        if (isAlreadyPresent) {
          newList = prevValue.filter((elem) => elem !== value);
          return newList;
        }

        return prevValue;
      });
    }
  }

  function searchFromFilter() {
    props.searchOnFilter({
      subarea: subArea,
      budget: budgetPrice,
      rooms: requiredRooms,
      beds: requiredBeds,
      baths: requiredBaths,
      facilties: facilityRequired,
      city: city?.cityName,
    });
  }

  const info =
    props?.customer_searched_place?.data &&
    props?.customer_searched_place?.data[0];

  return (
    <div className="place-main-div">
      <Container className="top-container" fluid>
        <Row className="gx-0">
          <Col className="top-div">
            <Container className="second-container" fluid>
              <Row className="gx-5">
                <Col sm={4}>
                  <div className="city-name">{info?.name}</div>
                  <div className="city-description">{info?.description}</div>
                </Col>
                <Col sm={4}></Col>
                <Col sm={4}>
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
                        src={info?.city_image}
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
                    <Col sm={9}>
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
                    <Col sm={3}>
                      <Container className="filter-container">
                        <Row className="gx-0">
                          <Col sm={12}>
                            <Form>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicArea"
                              >
                                <Form.Label className="area-text">
                                  Area
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  className="area-input"
                                  placeholder=""
                                  value={subArea}
                                  onChange={changeTheSubArea}
                                />
                                {/* <Form.Label className="">Map</Form.Label>                    */}
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="formBasicPrice"
                              >
                                <Form.Label className="price-text">
                                  Price
                                </Form.Label>
                                <div className="price-badge-div">
                                  <Badge className="price-badge">upto</Badge>
                                  <Badge className="price-badge">
                                    {budgetPrice}
                                  </Badge>
                                </div>
                                <div className="price-range">
                                  <Form.Range
                                    min="0"
                                    max="30000"
                                    value={budgetPrice}
                                    onChange={changeTheBudgetPrice}
                                  />
                                </div>
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="formBasicRoomsAndBeds"
                              >
                                <Form.Label className="roomandbeds-text">
                                  Rooms and Beds
                                </Form.Label>
                                <Row className="gx-0">
                                  <Col sm={12} className="roomandbeds-column">
                                    <div className="roomandbeds-column-text">
                                      Rooms
                                    </div>
                                    <div className="roomandbeds-column-text">
                                      <InputGroup className="input-group-rooms">
                                        <Button
                                          variant=""
                                          id="button-addon1"
                                          onClick={() =>
                                            changeTheRequiredRooms("decrease")
                                          }
                                        >
                                          <span className="minus-sign">
                                            &darr;
                                          </span>
                                        </Button>
                                        <Form.Label
                                          className="rooms-label-text"
                                          aria-label="Example text with button addon"
                                          aria-describedby="basic-addon1 basic-addon2"
                                        >
                                          {requiredRooms}
                                        </Form.Label>
                                        <Button
                                          variant=""
                                          id="button-addon2"
                                          onClick={() =>
                                            changeTheRequiredRooms("increase")
                                          }
                                        >
                                          <span className="plus-sign">
                                            &uarr;
                                          </span>
                                        </Button>
                                      </InputGroup>
                                    </div>
                                  </Col>
                                  <Col sm={12} className="roomandbeds-column">
                                    <div className="roomandbeds-column-text">
                                      Beds
                                    </div>
                                    <div className="roomandbeds-column-text">
                                      <InputGroup className="input-group-rooms">
                                        <Button
                                          variant=""
                                          id="button-addon1"
                                          onClick={() =>
                                            changeTheRequiredBeds("decrease")
                                          }
                                        >
                                          <span className="minus-sign">
                                            &darr;
                                          </span>
                                        </Button>
                                        <Form.Label
                                          className="rooms-label-text"
                                          aria-label="Example text with button addon"
                                          aria-describedby="basic-addon1 basic-addon2"
                                        >
                                          {requiredBeds}
                                        </Form.Label>
                                        <Button
                                          variant=""
                                          id="button-addon2"
                                          onClick={() =>
                                            changeTheRequiredBeds("increase")
                                          }
                                        >
                                          <span className="plus-sign">
                                            &uarr;
                                          </span>
                                        </Button>
                                      </InputGroup>
                                    </div>
                                  </Col>
                                  <Col sm={12} className="roomandbeds-column">
                                    <div className="roomandbeds-column-text">
                                      Baths
                                    </div>
                                    <div className="roomandbeds-column-text">
                                      <InputGroup className="input-group-rooms">
                                        <Button
                                          variant=""
                                          id="button-addon1"
                                          onClick={() =>
                                            changeTheRequiredBaths("increase")
                                          }
                                        >
                                          <span className="minus-sign">
                                            &darr;
                                          </span>
                                        </Button>
                                        <Form.Label
                                          className="rooms-label-text"
                                          aria-label="Example text with button addon"
                                          aria-describedby="basic-addon1 basic-addon2"
                                        >
                                          {requiredBaths}
                                        </Form.Label>
                                        <Button
                                          variant=""
                                          id="button-addon2"
                                          onClick={() =>
                                            changeTheRequiredBaths("increase")
                                          }
                                        >
                                          <span className="plus-sign">
                                            &uarr;
                                          </span>
                                        </Button>
                                      </InputGroup>
                                    </div>
                                  </Col>
                                </Row>
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="formBasicFacilities"
                              >
                                <Form.Label className="facilities-text">
                                  Facilities
                                </Form.Label>
                                <Row className="gx-0">
                                  <Col sm={12} className="facilities-column">
                                    <div className="facilities-column-text">
                                      Gym
                                    </div>
                                    <div className="facilities-column-text">
                                      <InputGroup className="input-group-facilities">
                                        <Form.Check
                                          type="checkbox"
                                          id="gym-check-box"
                                          value="gym"
                                          className="facilities-checkbox"
                                          aria-label="gym-check-box"
                                          onChange={addOrRemoveFacility}
                                        />
                                      </InputGroup>
                                    </div>
                                  </Col>
                                  <Col sm={12} className="facilities-column">
                                    <div className="facilities-column-text">
                                      Beach
                                    </div>
                                    <div className="facilities-column-text">
                                      <InputGroup className="input-group-facilities">
                                        <Form.Check
                                          type="checkbox"
                                          id="beach-check-box"
                                          value="beach"
                                          className="facilities-checkbox"
                                          aria-label="beach-check-box"
                                          onChange={addOrRemoveFacility}
                                        />
                                      </InputGroup>
                                    </div>
                                  </Col>
                                  <Col sm={12} className="facilities-column">
                                    <div className="facilities-column-text">
                                      TV
                                    </div>
                                    <div className="facilities-column-text">
                                      <InputGroup className="input-group-facilities">
                                        <Form.Check
                                          type="checkbox"
                                          id="tv-check-box"
                                          value="tv"
                                          className="facilities-checkbox"
                                          aria-label="tv-check-box"
                                          onChange={addOrRemoveFacility}
                                        />
                                      </InputGroup>
                                    </div>
                                  </Col>
                                  <Col sm={12} className="facilities-column">
                                    <div className="facilities-column-text">
                                      Bath Tub
                                    </div>
                                    <div className="facilities-column-text">
                                      <InputGroup className="input-group-facilities">
                                        <Form.Check
                                          type="checkbox"
                                          id="bath-tub-check-box"
                                          value="bath tub"
                                          className="facilities-checkbox"
                                          aria-label="bath-tub-check-box"
                                          onChange={addOrRemoveFacility}
                                        />
                                      </InputGroup>
                                    </div>
                                  </Col>
                                </Row>
                              </Form.Group>
                              {/* <div className='all-facilties'>
                                                          All facilties      
                                        </div> */}

                              <Form.Group
                                className="mt-5"
                                controlId="formBasicFilterButton"
                              >
                                <div className="d-grid gap-2">
                                  <Button
                                    variant="primary"
                                    className="filter-search-button"
                                    size="sm"
                                    onClick={searchFromFilter}
                                  >
                                    Search
                                  </Button>
                                </div>
                              </Form.Group>
                            </Form>
                          </Col>
                        </Row>
                      </Container>
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
    customer_searched_place: states.app.customerPlaceSearch,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlaceDetails: (data) =>
      dispatch({
        type: "LANDING_SEARCH_ON_BUDGET",
        payload: data,
      }),
    searchOnFilter: (data) =>
      dispatch({
        type: "SEARCH_ON_FILTER",
        payload: data,
      }),
  };
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(FindCity)
);
