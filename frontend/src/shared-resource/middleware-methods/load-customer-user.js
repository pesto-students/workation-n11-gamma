// https://redux.js.org/tutorials/fundamentals/part-6-async-logic
import axios from "axios"

export var random = (storeAPI)=>(next)=>(action)=>{
    console.log("calling middle ware");
    next(action)
}


export var loadCustomer = (storeAPI)=>(next)=>async(action)=>{
    // if (action.type === 'Load_Customer') {
    //                 storeAPI.dispatch({
    //                     status: 'Initiated',
    //                     type: 'CUSTOMER_USER_REDUCER',
    //                 })
    //                 await axios.get("https://jsonplaceholder.typicode.com/photos")
    //                     //   .then(data=>data.json)
    //                     .then(res=>{
    //                         console.log(res.data);
    //                         storeAPI.dispatch({
    //                             status: 'Success',
    //                             type: 'CUSTOMER_USER_REDUCER',
    //                             payload: res.data
    //                         })
    //                     })
    //                     .catch(err=>{
    //                         storeAPI.dispatch({
    //                             status: 'Error',
    //                             type: 'CUSTOMER_USER_REDUCER',
    //                             payload: (err && err.massage) || 'Some internal error'
    //                         })
    //                     })
    // }
    next(action)
}

