import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "../shared-resource/store/withRouter";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./contactus.css";

function ContactUs(props) {
  toast.configure();

  const [name, changeName] = useState("");
  const [emailAddress, changeEmailAddress] = useState("");
  const [query, changeQuery] = useState("");

  const notify = async () => {
    toast.error("Required email, name and query !", { theme: "dark" });
  };

  const notifyEmailError = async () => {
    toast.error("Email address is not correct !", { theme: "dark" });
  };

  const notifySuccessfulSent = async () => {
    toast.error(
      "If your mail is correct, we have successfully received your query, our executive will contact you soon !",
      { theme: "light" }
    );
  };

  const notifyRegretSent = async () => {
    toast.error("Sorry! the Query is not submitted.", { theme: "dark" });
  };

  useEffect(() => {}, [name, emailAddress, query]);

  function changeTheUsername(e) {
    const value = e.target.value;
    changeName(value);
  }

  function changeTheEmail(e) {
    const value = e.target.value;
    changeEmailAddress(value);
  }

  function changeTheQuery(e) {
    const value = e.target.value;
    changeQuery(value);
  }

  async function submitQuery(e) {
    e.preventDefault();
    // const data = new FormData(event.target);
    if (!name || !emailAddress || !query) {
      notify();
    } else {
      let lastAtPos = emailAddress.lastIndexOf("@");
      let lastDotPos = emailAddress.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          emailAddress.indexOf("@@") === -1 &&
          lastDotPos >= 2 &&
          emailAddress.length - lastDotPos > 2
        )
      ) {
        notifyEmailError();
      } else {
        const data = {
          name: name,
          email: emailAddress,
          message: query,
        };
        await axios
          .post("/place/form-submit-url", data)
          .then((data) => {
            notifySuccessfulSent();
          })
          .catch((err) => {
            notifyRegretSent();
          });
      }
    }
  }

  return (
    <div className=" contactus-background main-contactus-page">
      <Container className="contactus-page-top-container" fluid>
        <Row>
          <Col sm={12}>Live the life better way, Explore with us</Col>
        </Row>
      </Container>
      <Container className="contactus-page-second-container" fluid>
        <Row className="gx-0 explore-top-location-contactus">
          <Col sm={12} className="explore-top-location-col">
            <Container className="explore-top-location-main-container" fluid>
              <Row className="gx-0">
                <Col sm={12} className="location-main-container-first-row-col">
                  Just feed your Query:
                </Col>
              </Row>
              <Row className="gx-0">
                <Col sm={12} className="location-main-container-second-row-col">
                  <Row xs={1} sm={2} md={4} className="g-5">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          value={name}
                          onChange={changeTheUsername}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          value={emailAddress}
                          onChange={changeTheEmail}
                        />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Your Query ? </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={query}
                          onChange={changeTheQuery}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check
                          type="checkbox"
                          label="Check for recieving newsletter subscription."
                        />
                      </Form.Group>
                      <Button
                        className="query-button"
                        variant="primary"
                        type="button"
                        onClick={submitQuery}
                      >
                        Submit Query
                      </Button>
                    </Form>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapStatesToProps = (states, props) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStatesToProps, mapDispatchToProps)(ContactUs)
);
