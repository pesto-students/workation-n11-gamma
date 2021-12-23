/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../shared-resource/store/withRouter";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import PaymentSummary from "./Paymentsummary";
import "./find_city.css";

function HotelAvailable(props) {
  toast.configure();
  const city = useParams();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [noOfRooms, setNoOfRooms] = useState(2);
  const [totalAmount, setTotalAmount] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");

  useEffect(() => {}, [fromDate, toDate, noOfRooms, totalAmount]);
  useEffect(() => {}, [showModal, modalData]);
  useEffect(() => {
    props.getHotelDetails(city.id);
  }, []);

  const info = props?.hotelDetails?.data && props?.hotelDetails?.data[0];
  const propsAmount = info?.price;

  const notify = async () => {
    toast.error("Please choose the correct date !", { theme: "dark" });
  };

  const notifyLogin = async () => {
    toast.error("Please login to book !", { theme: "dark" });
  };

  function changeFromDate(e) {
    const value = e.target.value;
    let days = 0;
    if (toDate) {
      const localToDate = new Date(toDate);
      const localFromDate = new Date(value);
      let difference = localToDate.getTime() - localFromDate.getTime();
      days = difference / (1000 * 3600 * 24);
      if (days < 1) {
        notify();
        return;
      }
    }
    if (days < 0) {
      days = 0;
    }
    setFromDate(value);
    setNumberOfDays(days);
  }

  function changeToDate(e) {
    const value = e.target.value;
    let days = 0;
    if (fromDate) {
      const localToDate = new Date(value);
      const localFromDate = new Date(fromDate);
      let difference = localToDate.getTime() - localFromDate.getTime();
      days = difference / (1000 * 3600 * 24);
      if (days < 1) {
        notify();
        return;
      }
    }
    if (days < 0) {
      days = 0;
    }
    setToDate(value);
    setNumberOfDays(days);
  }

  function changeNoOfRooms(e) {
    let value = e.target.value;
    if (value > 5) {
      value = 5;
    }
    if (value < 2) {
      value = 2;
    }
    setNoOfRooms(value);
    setTotalAmount((value - 2) * 2000);
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  function triggerModal(value) {
    setShowModal(value);
    if (value === false) {
      props.router.navigate("/customer/findcities");
    }
  }

  async function displayRazorpay(payload) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await axios.post(API_URL+"/payment/orders", { ...payload });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_N654PZgviWvSHb", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: payload.username,
      description: `Booking_user_${payload?.userId}_place_${payload.hotel_id}`,
      image: "logo ",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          ...payload,
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(API_URL+"/payment/success", data);
        if (result.data.msg === "success") {
          // props.router.navigate("/customer/findHotels");
          setModalData(result.data.bookingId);
          triggerModal(true);
        }
      },
      prefill: {
        name: payload.username,
        email: payload.useremail,
        contact: "912323232323",
        card: "4718 6091 0820 4366",
        method: "card",
        "card[number]": "4718 6091 0820 4366",
        "card[expiry]": "12/27",
        "card[cvv]": "123",
      },
      notes: {
        address: `${payload.hotelId}`,
      },
      theme: {
        color: "#61dafb",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  function completeTheBooking(e) {
    e.preventDefault();
    const localToDate = new Date(toDate);
    const localFromDate = new Date(fromDate);
    let difference = localToDate.getTime() - localFromDate.getTime();
    let Difference_In_Days = difference / (1000 * 3600 * 24);
    if (Difference_In_Days < 1) {
      notify();
      return;
    }

    if (!props?.user?.user?.isLogin) {
      notifyLogin();
      return;
    }

    if (props?.user?.user?.isLogin && props?.user?.user?.isHost) {
      notifyLogin();
      return;
    }

    if (!toDate || !fromDate) {
      notify();
      return;
    }

    const bookingPayload = {
      toDate,
      fromDate,
      numberOfDays,
      amount:
        Number.parseInt(propsAmount) + Number.parseInt((noOfRooms - 2) * 2000),
      noOfRooms,
      userId: props?.user?.user?.userId,
      hotelId: city.id,
      username: props?.user?.user?.userName,
      useremail: props?.user?.user?.userEmail,
    };
    displayRazorpay(bookingPayload);
  }

  return (
    <div className="place-main-div">
      <Container className="top-container" fluid>
        <Row className="gx-0">
          <Col className="top-div">
            <Container className="second-container" fluid>
              <Row className="gx-5">
                <Col sm={7}>
                  {showModal ? (
                    <PaymentSummary
                      triggerModal={triggerModal}
                      modalBookingId={modalData}
                      showModal={showModal}
                    />
                  ) : null}
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
                          <Form.Control
                            type="date"
                            className="hotel-from-date"
                            onChange={changeFromDate}
                          />
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
                          <Form.Control
                            type="date"
                            className="hotel-to-date"
                            onChange={changeToDate}
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridTotalDays">
                          <Form.Label className="booking-fileds-label">
                            Total Days
                          </Form.Label>
                          <Form.Control
                            type="text"
                            className="total-days-booking"
                            value={numberOfDays}
                            disabled
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          sm={6}
                          className="mb-3"
                          controlId="formGridAmount"
                        >
                          <Form.Label className="booking-fileds-label">
                            Amount
                          </Form.Label>
                          <Form.Control
                            type="text"
                            value={
                              Number.parseInt(info?.price ? info?.price : 0) +
                              Number.parseInt(totalAmount)
                            }
                            className="amount-booking"
                            disabled
                          />
                          <Form.Text className="text-white small-text-room">
                            Extra 2000 for each increase of room.
                          </Form.Text>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          sm={4}
                          className="mb-3"
                          controlId="formGridAmount"
                        >
                          <Form.Label className="booking-fileds-label">
                            No of Rooms
                          </Form.Label>
                          <Form.Control
                            type="number"
                            value={noOfRooms}
                            min={2}
                            max={5}
                            className="room-booking"
                            onChange={changeNoOfRooms}
                          />
                          <Form.Text className="text-white small-text-room">
                            Only Choose between 2 to 5.
                          </Form.Text>
                        </Form.Group>
                      </Row>

                      <Button
                        variant="primary"
                        type="button"
                        className="booking-fileds-button"
                        onClick={completeTheBooking}
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
    user: states.app.user,
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
