/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "../../shared-resource/store/withRouter";
import { connect } from "react-redux";

function BookingsList(props) {
  useEffect(() => {
    props.load_admin_bookings();
  }, []);

  return (
    <>
      <div className="BookingsList-main-top">
        <Container className="BookingsList-main-container" fluid>
          <Row className="g-0">
            <Col sm={12} className="subcomponent-second-col">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User_Reference</th>
                    <th>Place_reference</th>
                    <th>Checkin time</th>
                    <th>Checkout time</th>
                    <th>Booking price</th>
                    <th>Reference</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {props.bookingList?.data?.length
                    ? props.bookingList.data.map((_, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{_?.userId}</td>
                            <td>{_?.placeId}</td>
                            <td>{_?.checkin?._seconds}</td>
                            <td>{_?.checkout?._seconds}</td>
                            <td>{_?.amount}</td>
                            <td>{_?.id}</td>
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
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

const mapStatesToProps = (states, props) => {
  return {
    bookingList: states.app.adminBookingsListData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load_admin_bookings: () =>
      dispatch({
        type: "LOAD_ADMIN_BOOKINGS",
      }),
  };
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(BookingsList)
);
