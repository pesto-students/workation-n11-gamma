/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "../../shared-resource/store/withRouter";
import { connect } from "react-redux";
import axios from "axios";
import "../Pages/adminlandingpage.css";

function CitiesList(props) {
  const [addCity, changeAddCity] = useState(false);
  const [cityname, changecityname] = useState("");
  const [citydescription, changecitydescription] = useState("");
  const [file, setFile] = useState();
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [loading, setLoading] = useState(false);
  toast.configure();

  useEffect(() => {}, [
    cityname,
    citydescription,
    file,
    latitude,
    longitude,
    loading,
    addCity,
  ]);

  const notify = async () => {
    toast.error("Something missing !", { theme: "dark" });
  };

  const notifyAlreadyExists = async () => {
    toast.error(
      "Please don't add city again if already in the list. Currently we are not having validation for already present. !",
      { theme: "dark" }
    );
  };

  useEffect(() => {
    props.load_admin_cities();
  }, []);

  function addTheCity() {
    changeAddCity(true);
  }

  function backToTable() {
    changeAddCity(false);
  }

  function changeTheCity(e) {
    const value = e.target.value;
    changecityname(value);
  }

  function changeTheDescription(e) {
    const value = e.target.value;
    changecitydescription(value);
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
    changecitydescription("");
    setLatitude();
    setFile();
    setLongitude();
  }

  function callDataRepeat() {
    props.load_admin_cities();
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!file || !citydescription || !cityname || !longitude || !latitude) {
      notify();
      return;
    }
    notifyAlreadyExists();
    const result = await postImage({
      image: file,
      description: citydescription,
      name: cityname,
      longitude,
      latitude,
    });
    if (result) {
      setLoading(false);
      changeAddCity(false);
      resetAll();
      callDataRepeat();
    }
  }
const API_URL=process.env.API_URL;
  async function postImage({ image, description, name, longitude, latitude }) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    setLoading(true);
    const result = await axios.post(API_URL+"/upload/upload_single", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result;
  }
  return (
    <>
      <div className="CitiesList-main-top">
        <Container className="CitiesList-main-container" fluid>
          <Row className="g-0">
            <Col sm={12} className="add-city-button-div">
              {!addCity ? (
                <Button
                  type="button"
                  className="add-city-button"
                  onClick={addTheCity}
                >
                  &#43;City
                </Button>
              ) : (
                <Button
                  type="button"
                  className="add-city-button"
                  onClick={backToTable}
                >
                  Back
                </Button>
              )}
            </Col>
            <Col sm={12} className="subcomponent-second-col">
              {!addCity ? (
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Desciption</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.citiesList?.data?.length
                      ? props.citiesList.data.map((_, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{_?.name}</td>
                              <td title={_?.description}>
                                {_?.description?.length
                                  ? _?.description?.length > 35
                                    ? _?.description
                                        .substring(0, 35)
                                        .concat("...")
                                    : _?.description.substring(0, 35)
                                  : null}
                              </td>
                              <td>
                                <a>{"Remove+"}</a>
                                <a>{"Block+"}</a>
                                <a>{"Edit"}</a>
                              </td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                </Table>
              ) : (
                <div className="add-city-form-div">
                  {loading ? (
                    <h5 className="text-white">
                      {`${cityname} is being added to the list, Please wait...`}
                      <Spinner animation="border" size="sm" />
                    </h5>
                  ) : null}
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicCityName">
                      <Form.Label className="text-white">City Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={cityname}
                        onChange={changeTheCity}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label className="text-white">
                        City Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={citydescription}
                        onChange={changeTheDescription}
                      />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label className="text-white">
                        Select city image
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
                        <Form.Group as={Col} controlId="formGridLatitude">
                          <Form.Label className="text-white">
                            Latitude
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter latitude"
                            value={latitude}
                            max={99}
                            min={0}
                            onChange={changeTheLatitude}
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLongitude">
                          <Form.Label className="text-white">
                            Longitude
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter longitude"
                            value={longitude}
                            max={99}
                            min={0}
                            onChange={changeTheLongitude}
                          />
                        </Form.Group>
                      </Row>
                    </Form.Group>
                    <Button variant="dark" type="button" onClick={handleSubmit}>
                      ADD CITY
                    </Button>
                  </Form>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

const mapStatesToProps = (states, props) => {
  return {
    citiesList: states.app.adminCitiesListData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load_admin_cities: () =>
      dispatch({
        type: "LOAD_ADMIN_CITIES",
      }),
  };
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(CitiesList)
);
