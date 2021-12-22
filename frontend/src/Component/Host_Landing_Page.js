/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import { userContext } from "../shared-resource/Contexts/User_Context";
// import {userContext} from "../shared-resource/Contexts/User_Context"
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Form,
} from "react-bootstrap";
import "./host_landing_page.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { withRouter } from "../shared-resource/store/withRouter";

function HostLandingPage(props) {
  const userData = useContext(userContext);
  const [addHotel, setHotel] = useState(false);
  const [cityname, changecityname] = useState("");
  const [hotelDescription, changehotelDescription] = useState("");
  const [file, setFile] = useState();
  const [longitude, setLongitude] = useState("54.23");
  const [latitude, setLatitude] = useState("23.23");
  const [loading, setLoading] = useState(false);
  const [hotelname, setHotelName] = useState("");
  const [subarea, setSubarea] = useState("");
  const [priceperservice, setPriceperservice] = useState(12000);
  const [placetype, setplacetype] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [gymSelected, setGymselected] = useState(true);
  const [beachSelcted, setBeachselected] = useState(true);
  const [tvSelcted, setTvselected] = useState(true);
  const [tubSelcted, setTubselected] = useState(true);
  const [fullAdress, setFullAdress] = useState("");

  toast.configure();

  const notify = async () => {
    toast.error("Something missing !", { theme: "dark" });
  };

  const notifyAlreadyExists = async () => {
    toast.error(
      "Please don't add hotel again if already in the list. Currently we are not having validation for already present. !",
      { theme: "dark" }
    );
  };

  useEffect(() => {
    props.loadLandingPageData(userData.userId);
  }, []);

  useEffect(() => {}, [
    addHotel,
    cityname,
    hotelDescription,
    file,
    latitude,
    longitude,
    loading,
    hotelname,
    subarea,
    priceperservice,
    placetype,
    fromDate,
    toDate,
    gymSelected,
    beachSelcted,
    tvSelcted,
    tubSelcted,
    fullAdress,
  ]);

  function addTheHotel() {
    setHotel(true);
  }

  function backToList() {
    setHotel(false);
  }

  function changeTheCity(e) {
    const value = e.target.value;
    changecityname(value);
  }

  function changeTheDescription(e) {
    const value = e.target.value;
    changehotelDescription(value);
  }

  function changeTheFile(e) {
    const value = e.target.files[0];
    setFile(value);
  }

  function changeTheLatitude(e) {
    const value = e.target.value;
    setLatitude(value);
  }

  function changeTheLongitude(e) {
    const value = e.target.value;
    setLongitude(value);
  }

  function resetAll() {
    changecityname("");
    changehotelDescription("");
    setLatitude();
    setFile();
    setLongitude();
    setHotelName();
    setSubarea();
    setPriceperservice(12000);
    setplacetype("");
    setFromDate("");
    setToDate("");
    setGymselected(true);
    setBeachselected(true);
    setTvselected(true);
    setTubselected(true);
    setFullAdress("");
  }

  function changeHotelName(e) {
    const value = e.target.value;
    setHotelName(value);
  }

  function changeFulladress(e) {
    const value = e.target.value;
    setFullAdress(value);
  }

  function changeSubarea(e) {
    const value = e.target.value;
    setSubarea(value);
  }

  function changePriceperservice(e) {
    const value = e.target.value;
    setPriceperservice(value);
  }

  function changePlacetype(e) {
    const value = e.target.value;
    setplacetype(value);
  }

  function changeFromDate(e) {
    const value = e.target.value;
    setFromDate(value);
  }

  function changeToDate(e) {
    const value = e.target.value;
    setToDate(value);
  }

  function changeFacilities(e) {
    const value = e.target.value;
    const isChecked = e.target.checked;

    switch (value) {
      case "gym":
        setGymselected(isChecked);
        break;
      case "beach":
        setBeachselected(isChecked);
        break;
      case "tv":
        setTvselected(isChecked);
        break;
      case "bath-tub":
        setTubselected(isChecked);
        break;
      default:
        break;
    }
  }

  function callDataRepeat() {
    props.loadLandingPageData(userData.userId);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !file ||
      !hotelDescription ||
      !cityname ||
      !longitude ||
      !latitude ||
      !hotelname ||
      !subarea ||
      !priceperservice ||
      !placetype ||
      !fromDate ||
      !toDate ||
      !fullAdress
    ) {
      notify();
      return;
    }
    notifyAlreadyExists();
    let amaneties = [];

    if (gymSelected) {
      amaneties.push("gym");
    }
    if (beachSelcted) {
      amaneties.push("beach");
    }
    if (tvSelcted) {
      amaneties.push("tv");
    }
    if (tubSelcted) {
      amaneties.push("bath-tub");
    }
    const result = await postImage({
      image: file,
      description: hotelDescription,
      name: hotelname,
      city: cityname,
      longitude,
      latitude,
      subarea,
      priceperservice,
      placetype,
      fromDate,
      toDate,
      amaneties,
      user: userData.userId,
      fullAdress,
    });
    if (result) {
      setLoading(false);
      setHotel(false);
      resetAll();
      callDataRepeat();
    }
  }

  async function postImage({
    image,
    description,
    name,
    city,
    longitude,
    latitude,
    subarea,
    priceperservice,
    placetype,
    fromDate,
    toDate,
    amaneties,
    user,
    fullAdress,
  }) {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("hotelname", name);
    formData.append("cityname", city);
    formData.append("description", description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("subarea", subarea);
    formData.append("priceperservice", priceperservice);
    formData.append("placetype", placetype);
    formData.append("fromDate", fromDate);
    formData.append("toDate", toDate);
    formData.append("amaneties", amaneties);
    formData.append("userId", user);
    formData.append("fullAdress", fullAdress);
    setLoading(true);
    const result = await axios.post("/upload/upload_hotel", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result;
  }

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
                    {!addHotel ? (
                      <Button
                        className="explore-location-link"
                        onClick={addTheHotel}
                      >
                        {" "}
                        Include hotel&nbsp;&#x2B;
                      </Button>
                    ) : (
                      <Button
                        className="explore-location-link"
                        onClick={backToList}
                      >
                        {" "}
                        Back to List&nbsp;
                      </Button>
                    )}
                  </Col>
                </Row>
                <Row className="gx-0">
                  <Col
                    sm={12}
                    className="hLanding-main-container-second-row-col"
                  >
                    {!addHotel ? (
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
                                    <Card.Title className="location-card-title-city">
                                      {" "}
                                      {_.data.city}
                                    </Card.Title>
                                  </Card.Body>
                                </Card>
                              </Link>
                            </Col>
                          ))
                        ) : props.landing_page_data.data?.length ===
                          0 ? null : (
                          <h5 className="text-white">
                            {`Please wait...`}
                            <Spinner animation="border" size="sm" />
                          </h5>
                        )}
                      </Row>
                    ) : (
                      <Row className="g-5">
                        <Col sm={12} className="add-hotel-top-col">
                          <div className="add-hotel-form-div">
                            <Form>
                              <Form.Group
                                className="mb-3"
                                controlId="formBasicHotelName"
                              >
                                <Form.Label className="text-white">
                                  Hotel Name
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter hotel"
                                  value={hotelname}
                                  onChange={changeHotelName}
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="formBasicCityName"
                              >
                                <Form.Label className="text-white">
                                  City
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter city"
                                  value={cityname}
                                  onChange={changeTheCity}
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="formBasicSubareaName"
                              >
                                <Form.Label className="text-white">
                                  Subarea
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter subarea"
                                  value={subarea}
                                  onChange={changeSubarea}
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="formBasicFulladdres"
                              >
                                <Form.Label className="text-white">
                                  Full Address
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter address"
                                  value={fullAdress}
                                  onChange={changeFulladress}
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="formBasicPrice"
                              >
                                <Form.Label className="text-white">
                                  Price per service
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter price"
                                  value={priceperservice}
                                  onChange={changePriceperservice}
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="formBasicPlacetype"
                              >
                                <Form.Label className="text-white">
                                  Placetype
                                </Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter place type"
                                  value={placetype}
                                  onChange={changePlacetype}
                                />
                              </Form.Group>

                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlTextarea1"
                              >
                                <Form.Label className="text-white">
                                  {`${placetype?.substring(0, 20)} Description`}
                                </Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows={3}
                                  value={hotelDescription}
                                  onChange={changeTheDescription}
                                />
                              </Form.Group>

                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label className="text-white">
                                  Select Hotel image
                                </Form.Label>
                                <Form.Control
                                  type="file"
                                  accept="image/*"
                                  name="image"
                                  onChange={changeTheFile}
                                />
                              </Form.Group>

                              <Form.Group>
                                <Row className="mb-3">
                                  <Form.Group
                                    as={Col}
                                    controlId="formGridLatitude"
                                  >
                                    <Form.Label className="text-white">
                                      Latitude
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter latitude"
                                      value={latitude}
                                      max={99}
                                      min={0}
                                      disabled
                                      onChange={changeTheLatitude}
                                    />
                                  </Form.Group>

                                  <Form.Group
                                    as={Col}
                                    controlId="formGridLongitude"
                                  >
                                    <Form.Label className="text-white">
                                      Longitude
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter longitude"
                                      value={longitude}
                                      max={99}
                                      min={0}
                                      disabled
                                      onChange={changeTheLongitude}
                                    />
                                  </Form.Group>
                                </Row>
                              </Form.Group>
                              <Form.Group>
                                <Row className="mb-3">
                                  <Form.Group
                                    as={Col}
                                    controlId="formGridDates"
                                  >
                                    <Form.Label className="text-white">
                                      Available From
                                    </Form.Label>
                                    <Form.Control
                                      type="date"
                                      value={fromDate}
                                      onChange={changeFromDate}
                                    />
                                  </Form.Group>

                                  <Form.Group
                                    as={Col}
                                    controlId="formGridLongitude"
                                  >
                                    <Form.Label className="text-white">
                                      Available To
                                    </Form.Label>
                                    <Form.Control
                                      type="date"
                                      value={toDate}
                                      onChange={changeToDate}
                                    />
                                  </Form.Group>
                                  <Form.Text>
                                    Date difference must be more than 7 days, we
                                    are not validating currently.
                                  </Form.Text>
                                </Row>
                                <Form.Group
                                  as={Col}
                                  controlId="formGridAmenities"
                                >
                                  <Form.Label className="text-white">
                                    Facilties
                                  </Form.Label>
                                  <Form.Check
                                    label="Gym"
                                    name="group1"
                                    type="checkbox"
                                    value="gym"
                                    checked={gymSelected}
                                    onChange={changeFacilities}
                                    // id={`inline-${type}-2`}
                                  />
                                  <Form.Check
                                    label="Beach"
                                    name="group1"
                                    type="checkbox"
                                    value="beach"
                                    checked={beachSelcted}
                                    onChange={changeFacilities}
                                  />
                                  <Form.Check
                                    label="TV"
                                    name="group1"
                                    type="checkbox"
                                    value="tv"
                                    checked={tvSelcted}
                                    onChange={changeFacilities}
                                  />
                                  <Form.Check
                                    label="Bath Tub"
                                    name="group1"
                                    type="checkbox"
                                    value="bath-tub"
                                    checked={tubSelcted}
                                    onChange={changeFacilities}
                                  />
                                </Form.Group>
                              </Form.Group>
                              <Button
                                variant="dark"
                                type="button"
                                onClick={handleSubmit}
                                className="mt-3"
                              >
                                ADD HOTEL
                              </Button>
                              {loading ? (
                                <h5 className="text-white mt-3">
                                  {`${hotelname} is being added to the list, Please wait...`}
                                  <Spinner animation="border" size="sm" />
                                </h5>
                              ) : null}
                            </Form>
                          </div>
                        </Col>
                      </Row>
                    )}
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
