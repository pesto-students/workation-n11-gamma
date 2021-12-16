import React,{useState,useEffect} from 'react'
import {connect} from "react-redux";
import {withRouter} from '../../shared-resource/store/withRouter';
import {useParams, useLocation, Link} from 'react-router-dom'
import { Container, Row, Col, Card, Form, Badge, InputGroup, Button, FormControl } from 'react-bootstrap';
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
      }, [])
    
    function searchFromFilter() {
        props.searchOnFilter({
            subarea: 'new goa',
            budget: '13000',
            rooms: 2,
            beds: 2,
            baths: 3,
            facilties: [
                'gym', 'tv'
            ]
             })
      }

    return (
        <div className='place-main-div'>
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
                        <Col>1 of 2 check the padding and margin</Col>
                    </Row>
                    <Row>
                        <Col sm={9}>
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
                        <Col sm={3}>
                                    <Container className="filter-container">
                                    <Row className="gx-0">
                                        <Col sm={12}>
                                            {/* <Stack gap={3}>
                                            <div className="stack-area-text">
                                             Area      
                                            </div>
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
                                            </Stack>         */}
                                                        <Form>
                                                            
                                        <Form.Group className="mb-3" controlId="formBasicArea">
                                            <Form.Label className="area-text">Area</Form.Label>
                                            <Form.Control type="text" className="area-input" placeholder="" />
                                             {/* <Form.Label className="">Map</Form.Label>                    */}
                                        </Form.Group>
                                                            
                                        <Form.Group className="mb-3" controlId="formBasicPrice">
                                            <Form.Label className="price-text">Price</Form.Label>
                                            <div className="price-badge-div">
                                                <Badge className="price-badge">New</Badge>
                                                <Badge className="price-badge">New</Badge>
                                            </div>
                                            <div className="price-range">
                                            <Form.Range min='0' max='100000'/>
                                            </div>
                                            </Form.Group>
                                                            
                                            <Form.Group className="mb-3" controlId="formBasicRoomsAndBeds">
                                            <Form.Label className="roomandbeds-text">Rooms and Beds</Form.Label>
                                                <Row className="gx-0">
                                                    <Col sm={12} className="roomandbeds-column">
                                                        <div className='roomandbeds-column-text'>
                                                            Rooms
                                                        </div>
                                                        <div className='roomandbeds-column-text'>
                                                        
                                                            <InputGroup className="input-group-rooms">
                                                                <Button variant="" id="button-addon1">
                                                                <span className='minus-sign'>&darr;</span>
                                                                </Button>
                                                                <Form.Label className="rooms-label-text"
                                                                aria-label="Example text with button addon"
                                                                aria-describedby="basic-addon1 basic-addon2"
                                                                                >2</Form.Label>
                                                                <Button variant="" id="button-addon2">
                                                                <span className='plus-sign'>&uarr;</span>
                                                                </Button>
                                                            </InputGroup>

                                                            </div>
                                                    </Col>
                                                    <Col sm={12} className="roomandbeds-column">
                                                        <div className='roomandbeds-column-text'>
                                                            Beds
                                                        </div>
                                                        <div className='roomandbeds-column-text'>
                                                           <InputGroup className="input-group-rooms">
                                                                <Button variant="" id="button-addon1">
                                                                <span className='minus-sign'>&darr;</span>
                                                                </Button>
                                                                <Form.Label className="rooms-label-text"
                                                                aria-label="Example text with button addon"
                                                                aria-describedby="basic-addon1 basic-addon2"
                                                                                >2</Form.Label>
                                                                <Button variant="" id="button-addon2">
                                                                <span className='plus-sign'>&uarr;</span>
                                                                </Button>
                                                            </InputGroup>
                                                            </div>
                                                    </Col>
                                                    <Col sm={12} className="roomandbeds-column">
                                                        <div className='roomandbeds-column-text'>
                                                            Baths
                                                        </div>
                                                        <div className='roomandbeds-column-text'>
                                                            <InputGroup className="input-group-rooms">
                                                                <Button variant="" id="button-addon1">
                                                                <span className='minus-sign'>&darr;</span>
                                                                </Button>
                                                                <Form.Label className="rooms-label-text"
                                                                aria-label="Example text with button addon"
                                                                aria-describedby="basic-addon1 basic-addon2"
                                                                                >2</Form.Label>
                                                                <Button variant="" id="button-addon2">
                                                                <span className='plus-sign'>&uarr;</span>
                                                                </Button>
                                                            </InputGroup>
                                                            </div>
                                                    </Col>
                                                </Row>                
                                            </Form.Group>
                                                            
                                            <Form.Group className="mb-3" controlId="formBasicFacilities">
                                            <Form.Label className="facilities-text">Facilities</Form.Label>
                                                <Row className="gx-0">
                                                    <Col sm={12} className="facilities-column">
                                                        <div className='facilities-column-text'>
                                                            Gym
                                                        </div>
                                                        <div className='facilities-column-text'>
                                                        
                                                            <InputGroup className="input-group-facilities">
                                                                 <Form.Check 
                                                                    type='checkbox'
                                                                    id='gym-check-box'
                                                                    value="gym"
                                                                    className="facilities-checkbox"                
                                                                    aria-label="gym-check-box"
                                                                />
                                                            </InputGroup>

                                                            </div>
                                                    </Col>
                                                    <Col sm={12} className="facilities-column">
                                                        <div className='facilities-column-text'>
                                                            Beach
                                                        </div>
                                                        <div className='facilities-column-text'>
                                                        
                                                            <InputGroup className="input-group-facilities">
                                                                 <Form.Check 
                                                                    type='checkbox'
                                                                    id='beach-check-box'
                                                                    value="beach"
                                                                    className="facilities-checkbox"                
                                                                    aria-label="beach-check-box"
                                                                />
                                                            </InputGroup>

                                                            </div>
                                                    </Col>
                                                    <Col sm={12} className="facilities-column">
                                                        <div className='facilities-column-text'>
                                                            TV
                                                        </div>
                                                        <div className='facilities-column-text'>
                                                        
                                                            <InputGroup className="input-group-facilities">
                                                                 <Form.Check 
                                                                    type='checkbox'
                                                                    id='tv-check-box'
                                                                    value="tv"
                                                                    className="facilities-checkbox"                
                                                                    aria-label="tv-check-box"
                                                                />
                                                            </InputGroup>

                                                            </div>
                                                    </Col>
                                                    <Col sm={12} className="facilities-column">
                                                        <div className='facilities-column-text'>
                                                            Bath Tub
                                                        </div>
                                                        <div className='facilities-column-text'>
                                                        
                                                            <InputGroup className="input-group-facilities">
                                                                 <Form.Check 
                                                                    type='checkbox'
                                                                    id='bath-tub-check-box'
                                                                    value="bath-tub"
                                                                    className="facilities-checkbox"                
                                                                    aria-label="bath-tub-check-box"
                                                                />
                                                            </InputGroup>

                                                            </div>
                                                    </Col>
                                                </Row>                
                                        </Form.Group>
                                        {/* <div className='all-facilties'>
                                                          All facilties      
                                        </div> */}
        
                                         <Form.Group className="mt-5" controlId="formBasicFilterButton">
                                            <div className="d-grid gap-2">
                                                        <Button variant="primary" className="filter-search-button" size="sm" onClick={searchFromFilter}>
                                                            Search
                                                        </Button>
                                                       
                                                        </div>
                                        </Form.Group>
                                        </Form>
                                        </Col>
                                    </Row>
                                    </Container>    
                                    
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
        }),
        searchOnFilter: (data) => dispatch({
            type: 'SEARCH_ON_FILTER',
            payload: data
        })
    }
  }

export default withRouter(connect(mapStatesToProps,mapDispatchToProps)(FindCity));


