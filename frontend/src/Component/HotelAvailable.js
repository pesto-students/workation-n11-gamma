import React,{useState,useEffect} from 'react'
import {connect} from "react-redux";
import {withRouter} from '../shared-resource/store/withRouter';
import {useParams, useLocation, Link} from 'react-router-dom'
import { Container, Row, Col, Card, Stack  } from 'react-bootstrap';
import queryString from 'query-string'
import "./find_city.css"
import samplePic from "../shared-resource/images/alessio-furlan-Vw3a0HgE7AM-unsplash.jpg"


function HotelAvailable(props){
      const city = useParams();
      const queryLocation = useLocation();
      const queries = queryString.parse(queryLocation.search)
      console.log(props);
      const [searchParams] = useState({...queries, city:city?.cityName})
 
      useEffect(()=>{
            props.getPlaceDetails(searchParams)
      },[])

    return (
        
        <></>
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

export default withRouter(connect(mapStatesToProps,mapDispatchToProps)(HotelAvailable));


