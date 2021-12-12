import React,{useState,useEffect} from 'react'
import {connect} from "react-redux";
import {withRouter} from '../../shared-resource/store/withRouter';
import {useParams, useLocation, Link} from 'react-router-dom'
import { Container, Row, Col, Card, Stack  } from 'react-bootstrap';
import queryString from 'query-string'
import "./find_city.css"
import samplePic from "../../shared-resource/images/alessio-furlan-Vw3a0HgE7AM-unsplash.jpg"


function FindCity(props){
      const city = useParams();
      const queryLocation = useLocation();
      const queries = queryString.parse(queryLocation.search)
      console.log(props);
      const [searchParams] = useState({...queries, city:city?.cityName})
 
      useEffect(()=>{
            props.getPlaceDetails(searchParams)
      },[])

    return (
        <div className='place-main-div pb-3'>
            <Container className="top-container" fluid>
            <Row className="gx-0">
                <Col className="top-div">
                <Container className="second-container" fluid>
                <Row className="gx-0">
                    <Col sm={6}>
                        <div className='city-name'>
                            {props.customer_searched_place.data?.placeName}
                        </div>
                        <div className='city-description'>
                        {props.customer_searched_place.data?.placeDescription}
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="place-map">
                            {    
                                props.customer_searched_place.data?.placeLocation?.lat + "/"+ props.customer_searched_place.data?.placeLocation?.lng
                            }
                        </div>
                        <div className='nomads-uploads'>
                            { 
                                //  props.customer_searched_place.data.nomadsUpload.map((elem)=>elem)
                                props.customer_searched_place.data?.nomadsUpload?.map((images)=>{
                                   return <div className=''>{images.toString()}</div>
                                })
                            }
                        </div>

                    </Col>
                </Row>

                <Row className="gx-0">
                <Container>
                    <Row>
                        <Col>1 of 2</Col>
                    </Row>
                    <Row>
                        <Col sm={8}>
                        <Row xs={1} sm={2} md={4} className="g-5">
                                {props.customer_searched_place.data?.hotelAvailable?.map((_, idx) => (
                                <Col>
                                    <Link to={`/customer/hotel/${_.id}`} className="text-white">
                                        <Card className="location-cards p-0">
                                        <Card.Img variant="top" src={samplePic} className="location-card-image m-0" />
                                        <Card.Body className="location-card-body">
                                        <Card.Title className="location-card-title"> {_.name}</Card.Title>
                                        </Card.Body>
                                       
                                    </Card>
                                    </Link>
                                </Col>
                                ))}
                                </Row>
                        </Col>
                        <Col sm={4}>
                                    <Stack gap={3}>
                                    <div className="bg-light border">First item</div>
                                    <div className="bg-light border">Second item</div>
                                    <div className="bg-light border">Third item</div>
                                    <div className="bg-light border">First item</div>
                                    <div className="bg-light border">Second item</div>
                                    <div className="bg-light border">Third item</div>
                                    <div className="bg-light border">First item</div>
                                    <div className="bg-light border">Second item</div>
                                    <div className="bg-light border">Third item</div>
                                    <div className="bg-light border">First item</div>
                                    <div className="bg-light border">Second item</div>
                                    <div className="bg-light border">Third item</div>
                                    </Stack>
                        </Col>
                    
                    </Row>
                    </Container>
                </Row>
                </Container>
                </Col>
            </Row>
            </Container>
        </div>
    )
}


const mapStatesToProps = (states,props)=>{
    return {
        customer_searched_place: states.app.customerPlaceSearch
    }
  }
  
  const mapDispatchToProps = (dispatch)=>{
    return {
        getPlaceDetails : (data) => dispatch({
            type: 'LANDING_SEARCH_ON_BUDGET',
            payload: data
        })
    }
  }

export default withRouter(connect(mapStatesToProps,mapDispatchToProps)(FindCity));


