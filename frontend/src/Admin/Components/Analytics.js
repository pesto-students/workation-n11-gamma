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
            <Col sm={12} className="subcomponent-second-col analytics-page">
              Available soon!
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
  return {};
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(Analytics)
);
