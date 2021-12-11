import React from 'react';
// import {userContext} from "../shared-resource/Contexts/User_Context"
import {Container, Row, Col, Card, Form, InputGroup, Button, FormControl} from "react-bootstrap"
import samplePic from "../shared-resource/images/alessio-furlan-Vw3a0HgE7AM-unsplash.jpg"
import "./landing.css"
import {Link} from 'react-router-dom'
import firstvideo from "../shared-resource/images/aleksandra-boguslawska-MS7KD9Ti7FQ-unsplash.jpg"
import {connect} from "react-redux";
import {withRouter} from '../shared-resource/store/withRouter';

function LandingPage(props){


     function searchPlaceOnBudget(){
             props.searchPlace({name:"Rishikesh", date:{from:"dsds",to:"dcd"},budget:"1234"})
     }

    return (
        <div className="main-landing-page">
            <Container className="landing-page-top-container" fluid>
            <Row>
            <Col sm={12}>Live the life better way, Explore with us</Col>
            </Row>
            </Container>
            <div className="landing-first-div">
            <Container className="landing-page-second-container" fluid>
            <Row>
            <Col sm={12}>
            <Container className="search-bar-landing" fluid>
                <Row className="search-landing-row">
                <Col xs={12}>
                            <Form className="search-from-main">
                            <Row className="align-items-center">

                            <Col sm={3} className="my-1 px-5 d-flex flex-column">
                            <Form.Label htmlFor="inlineFormInputName" className="text-center search-label">
                            Location
                            </Form.Label>
                            <InputGroup className="location-input-group">
                                <InputGroup.Text className="location-input-text">@</InputGroup.Text>
                                <Form.Control id="inlineFormInputName" className="input-location-box" placeholder="" />
                            </InputGroup>
                            
                            </Col>

                            <Col sm={3} className="my-1 px-5 d-flex flex-column">
                            <Form.Label htmlFor="location-date-group-id" className="text-center search-label" >
                            Dates
                            </Form.Label>
                            <div id="location-date-group-id" className='location-date-group'>
                            <FormControl id="inlineFormInputGroupDates1" className="location-date-pick-class" type="date" />
                            <span className='d-flex flex-row justify-content-center align-items-center'>&nbsp;to&nbsp;</span>
                            <FormControl id="inlineFormInputGroupDates2" className="location-date-pick-class" type="date"/>
                            </div>
                           
                            </Col>

                            <Col xs={3} className="my-1 px-5 d-flex flex-column">
                            <Form.Label htmlFor="inlineFormInputGroupBudget" className="text-center search-label" >
                            Budget
                            </Form.Label>
                            <>
                            <Form.Range min='0' max='100000'/>
                            <Form.Label>13000</Form.Label>
                            </>
                            </Col>

                            <Col xs={3} className="my-1 px-5 d-flex flex-column">
                            <Form.Label htmlFor="inlineFormInputButton" className="text-center search-label">
                            Search
                            </Form.Label>
                            <Button type="button" id="inlineFormInputButton" className="search-button-location" onClick={searchPlaceOnBudget}>Search</Button>
                            </Col>

                            </Row>
                            </Form>
                    </Col>
                {/* <Col xs={3}>1 of 3</Col>
                <Col xs={3}>1 of 3</Col>
                <Col xs={3}>1 of 3</Col> */}
                </Row>

            </Container>
            </Col>
            </Row>
            <Row className="gx-0">
                <Col sm={12} className="under-search-landing">
                    Work like the comfort of your home and explore different cultures with our quality standard partners which will
                    take care of all you needs for working from anywhere while not hammering your pocket get the subsidized stay at the best
                    hotels in the towns so that you can stay longer and enjoy nature and culture. 
                </Col>
            </Row>
            <Row className="gx-0 explore-top-location">
                <Col sm={12} className="explore-top-location-col">
                    <Container className="explore-top-location-main-container" fluid>
                         <Row className="gx-0">
                             <Col sm={12} className="location-main-container-first-row-col">
                                    Explore Top Locations
                             </Col>
                         </Row>
                         <Row className="gx-0">
                             <Col sm={12} className="location-main-container-second-row-col">
                                <Row xs={1} sm={2} md={4} className="g-5">
                                {Array.from({ length: 4 }).map((_, idx) => (
                                <Col>
                                    <Link to="#" className="text-white">
                                        <Card className="location-cards p-0">
                                        <Card.Img variant="top" src={samplePic} className="location-card-image m-0" />
                                        <Card.Body className="location-card-body">
                                        <Card.Title className="location-card-title"> Tiruvanthpuram</Card.Title>
                                        </Card.Body>
                                    </Card>
                                    </Link>
                                </Col>
                                ))}
                                </Row>
                             </Col>
                         </Row>
                         <Row className="gx-0">
                             <Col sm={12} className="location-main-container-third-row-col">
                                    <Link to="#" className="explore-location-link"> Explore More&nbsp;&gt;
                                    </Link>
                             </Col>
                         </Row>
                    </Container>
                </Col>
            </Row>
            </Container>

            </div>
            <div className="landing-page-video-div">
            <Container className="landing-page-video-container" fluid>
            <Row className="landing-video-text-top g-0">
            <Col sm={12} className="landing-video-text-top-col">
                <p>DISCOVER THE</p>
                <p>WORLD IN A</p>
                <p>NEW WAY</p>
            </Col>
            </Row>
            <Row className="landing-video-text-middle g-0">
            <Col sm={12} className="landing-video-text-middle-col">
                <div><Link to="#" className="video-link-text"> &#9654;</Link></div>
                <div>WATCH THE VIDEO</div>
            </Col>
            </Row>
            <Row className="landing-video-text-third g-0">
            <Col sm={5} className="landing-video-text-third-col-A">
            "Attachment to things and comfort is the main
            obstacle to the interesting life. People, as a
            rule, do not realize that at any time they can
            throw anything out of their lives. Anytime."
            </Col>
            <Col sm={7} className="landing-video-text-third-col-B">
            <Card className="landing-video-card">
                    <Card.Img variant="top" className="landing-video" src={firstvideo} />
            </Card>
            <Card className="landing-video-card">
                    <Card.Img variant="top" className="landing-video" src={firstvideo} />
            </Card>
            </Col>
            </Row>
            </Container>
            </div>
        </div>
    )
}

// export {LandingPage};
const mapStatesToProps = (states,props)=>{
    return {
        authorized_user_login: states.app.user
    }
  }
  
  const mapDispatchToProps = (dispatch)=>{
    return {
        searchPlace : (data) => dispatch({
            type: 'IS_LANDING_SEARCH_AVAILABLE',
            payload: data
        })
    }
  }

export default withRouter(connect(mapStatesToProps,mapDispatchToProps)(LandingPage));
