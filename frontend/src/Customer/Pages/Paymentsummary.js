/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Modal, Stack } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../../shared-resource/store/withRouter";

function PaymentSummary(props) {
  useEffect(() => {
    const bookingId = "AKAwiqid7i0sezGL8qFX";
    props.loadBookingDetails(bookingId);
  }, []);

  return (
    <>
      <Modal
        show={props.showModal}
        onHide={() => props.triggerModal(false)}
        dialogClassName="modal-95w"
        backdrop="static"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton className="bg-light">
          <Modal.Title id="example-custom-modal-styling-title">
            Booking Summary:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-white">
          <div className="modal-top-container">
            <Stack gap={2}>
              <div className="bg-light ">
                <div className="bg-light ">
                  <h5>User Details: </h5>
                </div>
                <b>Username: </b>
                {` ${props?.user?.user?.userName}`}
              </div>
              <div className="bg-light ">
                <b>Email: </b>
                {` ${props?.user?.user?.userEmail}`}
              </div>

              <div className="bg-light mt-3 ">
                <h5>Hotel Details: </h5>
              </div>
              <div className="bg-light ">
                <b>Hotel name: </b>
                {` ${props?.bookingDetails?.hotelDetails?.name || ""}`}
              </div>
              <div className="bg-light ">
                <b>Subarea: </b>
                {` ${props?.bookingDetails?.hotelDetails?.subarea || ""}`}
              </div>
              <div className="bg-light ">
                <b>Address: </b>
                {` ${props?.bookingDetails?.hotelDetails?.placeAddress || ""}`}
              </div>
              <div className="bg-light ">
                <b>Placetype: </b>
                {` ${props?.bookingDetails?.hotelDetails?.placeType || ""}`}
              </div>

              <div className="bg-light mt-3 ">
                <h5>Booking Details: </h5>
              </div>
              <div className="bg-light ">
                <b>Check In: </b>
                {` ${
                  props?.bookingDetails?.bookingDetails
                    ? props?.bookingDetails?.bookingDetails[0]?.checkin || ""
                    : ""
                }`}
              </div>
              <div className="bg-light ">
                <b>Check Out: </b>
                {` ${
                  props?.bookingDetails?.bookingDetails
                    ? props?.bookingDetails?.bookingDetails[0]?.checkout || ""
                    : ""
                }`}
              </div>
              <div className="bg-light ">
                <b>Stays for: </b>
                {` ${
                  props?.bookingDetails?.bookingDetails
                    ? props?.bookingDetails?.bookingDetails[0]?.numberOfDays ||
                      ""
                    : ""
                }`}
              </div>
              <div className="bg-light ">
                <b>Total amount: </b>
                {` ${
                  props?.bookingDetails?.bookingDetails
                    ? props?.bookingDetails?.bookingDetails[0]?.amount || ""
                    : ""
                }`}
              </div>
            </Stack>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

const mapStatesToProps = (states, props) => {
  return {
    bookingDetails: states.app.bookingSummary.data,
    user: states.app.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBookingDetails: (booking_id) =>
      dispatch({
        type: "BOOKING_SUMMARY_DATA",
        payload: booking_id,
      }),
  };
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(PaymentSummary)
);
