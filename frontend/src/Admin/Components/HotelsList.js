/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "../../shared-resource/store/withRouter";
import { connect } from "react-redux";

function HotelsList(props) {
  useEffect(() => {
    props.load_admin_hotels();
  }, []);

  return (
    <>
      <div className="HotelsList-main-top">
        <Container className="HotelsList-main-container" fluid>
          <Row className="g-0">
            <Col sm={12} className="subcomponent-second-col">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Subarea</th>
                    <th>Price/Service</th>
                    <th>Reference</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {props.hotelsList?.data?.length
                    ? props.hotelsList.data.map((_, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{_?.name}</td>
                            <td>{_?.city}</td>
                            <td>{_?.subarea}</td>
                            <td>{_?.price}</td>
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
    hotelsList: states.app.adminHotelsListData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load_admin_hotels: () =>
      dispatch({
        type: "LOAD_ADMIN_HOTELS",
      }),
  };
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(HotelsList)
);
