import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "../../shared-resource/store/withRouter";
import { connect } from "react-redux";

function Analytics(props) {
  return (
    <>
      <div className="Analytics-main-top">
        <Container className="Analytics-main-container" fluid>
          <Row className="g-0">
            <Col sm={12} className="subcomponent-second-col">
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    load_admin_users: () => dispatch({}),
  };
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(Analytics)
);
