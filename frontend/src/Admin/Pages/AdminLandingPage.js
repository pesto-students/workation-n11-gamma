/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Tab, ListGroup } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from "../../shared-resource/store/withRouter";
import UsersList from "../Components/UsersList";
import HotelsList from "../Components/HotelsList";
import CitiesList from "../Components/CitiesList";
import BookingsList from "../Components/BookingsList";
import Analytics from "../Components/Analytics";
import { connect } from "react-redux";
import "./adminlandingpage.css";

function AdminLandingPage(props) {
  const [marqTop, crossMarqTop] = useState(false);

  useEffect(() => {}, [marqTop]);

  function changethemarq(e) {
    crossMarqTop(true);
  }
  return (
    <>
      <div className="admin-main-top">
        <Container className="admin-main-container" fluid>
          <Row className="g-0">
            {!marqTop ? (
              <Col sm={12} className="d-flex flex-row admin-sub-first-col">
                <marquee
                  behavior="scroll"
                  direction="left"
                  width="99%"
                  height="30px"
                  scrollamount="8"
                  className="marqee-top"
                >
                  Download csv, analytical charts will be available soon!
                </marquee>
                <span className="py-0 my-0 clear-bttn" onClick={changethemarq}>
                  &#10006;
                </span>
              </Col>
            ) : null}
            <Col sm={12} className="admin-first-col">
              ADMIN PANEL | WELCOME ADMIN
            </Col>
            <Col sm={12} className="admin-second-col">
              <Tab.Container
                id="list-group-tabs-example"
                defaultActiveKey="#link1"
                className="tab-container"
              >
                <Row>
                  <Col sm={2}>
                    <ListGroup>
                      <ListGroup.Item action variant="dark" href="#link1">
                        USERS
                      </ListGroup.Item>
                      <ListGroup.Item action variant="dark" href="#link2">
                        HOTELS
                      </ListGroup.Item>
                      <ListGroup.Item action variant="dark" href="#link3">
                        CITIES
                      </ListGroup.Item>
                      <ListGroup.Item action variant="dark" href="#link4">
                        BOOKINGS
                      </ListGroup.Item>
                      <ListGroup.Item action variant="dark" href="#link5">
                        ANALYTICS
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col sm={10}>
                    <Tab.Content className="tab-contant-main">
                      <Tab.Pane eventKey="#link1">
                        <UsersList />
                      </Tab.Pane>
                      <Tab.Pane eventKey="#link2">
                        <HotelsList />
                      </Tab.Pane>
                      <Tab.Pane eventKey="#link3">
                        <CitiesList />
                      </Tab.Pane>
                      <Tab.Pane eventKey="#link4">
                        <BookingsList />
                      </Tab.Pane>
                      <Tab.Pane eventKey="#link5">
                        <Analytics />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
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
  connect(mapStatesToProps, mapDispatchToProps)(AdminLandingPage)
);
