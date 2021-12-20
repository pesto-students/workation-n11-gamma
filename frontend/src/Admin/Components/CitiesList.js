/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "../../shared-resource/store/withRouter";
import { connect } from "react-redux";

function CitiesList(props) {
  useEffect(() => {
    props.load_admin_cities();
  }, []);

  return (
    <>
      <div className="CitiesList-main-top">
        <Container className="CitiesList-main-container" fluid>
          <Row className="g-0">
            <Col sm={12} className="subcomponent-second-col">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Desciption</th>
                    <th>Reference</th>
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
