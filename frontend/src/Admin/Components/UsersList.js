/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "../../shared-resource/store/withRouter";
import { connect } from "react-redux";

function UsersList(props) {
  useEffect(() => {
    props.load_admin_users();
  }, []);

  return (
    <>
      <div className="usersList-main-top">
        <Container className="usersList-main-container" fluid>
          <Row className="g-0">
            <Col sm={12} className="subcomponent-second-col">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Usertype</th>
                    <th>Reference</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {props.usersList?.data?.length
                    ? props.usersList.data.map((_, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{_?.username}</td>
                            <td>{_?.email}</td>
                            <td>{_?.usertype}</td>
                            <td>{_?.id}</td>
                            <td>
                              <a>{"Remove+"}</a>
                              <a>{"Block+"}</a>
                              <a>{"Edit"} </a>
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
    usersList: states.app.adminUsersListData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    load_admin_users: () =>
      dispatch({
        type: "LOAD_ADMIN_USERS",
      }),
  };
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(UsersList)
);
