import React,{useState,useEffect} from 'react'
import {connect} from "react-redux";
import {withRouter} from '../../shared-resource/store/withRouter';
import {useParams, useLocation} from 'react-router-dom'
import queryString from 'query-string'
import "./find_city.css"
import "./hotelBooking.css"
import { Button } from 'react-bootstrap';

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
        
        <>
        <div className="full-container">
        <div className="flex-header-contaniner">
          <div className="container-details">
         <div className="place-name">
      Place Name
         </div>
         <div className="place-city">
          India
         </div>
<div className="place-description">
Goa is a state on the southwestern coast of India within the Konkan region, geographically separated from the Deccan highlands by the Western Ghats. It is surrounded by the Indian states of Maharashtra to the north and Karnataka to the east and south, with the Arabian Sea forming its western coast. It is India's smallest state by area and its fourth-smallest by population.
</div>
<div className="booking-summary">
    <div className="summary-col">  
      <div className="summary-heading">
         Check IN
      </div>
      <div className="summary-detail">
          dd mmm YYYY
      </div>
    </div>

    <div className="summary-col">  
    </div>
    <div className="summary-col">  
       <div className="summary-heading">
          Check Out
        </div>
        <div className="summary-detail">
        dd mmm YYYY
        </div>
    </div>
  <div className="summary-col">  
      <div className="summary-heading">
           Amount
      </div>
      <div className="summary-detail">
           XXX
      </div>
  
</div>

</div>
<div className="booking-amount">
<h3>Amount:</h3><h5>RS 0000</h5>
</div>
<div className="mb-2">
    <Button variant="primary" size="lg">
      Book Hotel
    </Button>
    
  </div>
<div>
      
</div>

          </div>
          <div className="container-slider">

          </div>

        </div>
        </div>
        </>
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


