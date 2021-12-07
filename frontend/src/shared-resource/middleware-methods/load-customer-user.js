// https://redux.js.org/tutorials/fundamentals/part-6-async-logic
import axios from "axios"

export var random = (storeAPI)=>(next)=>(action)=>{
    // console.log("calling middle ware");
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


export var authorizeUserLogin = (storeAPI)=>(next)=>async(action)=>{
    if (action.type === 'LOGIN_AUTHORIZE'){
        // console.log(action);
                    storeAPI.dispatch({
                        status: 'Initiated',
                        type: 'AUTHORIZE_USER_REDUCER',
                    })
                 await axios.get("https://jsonplaceholder.typicode.com/photos")
                        //   .then(data=>data.json)
                        .then(res=>{
                            const output = {
                                data : {
                                        isLogin: true,
                                        userEmail: 'rishabhv47@gmail.com',
                                        userName: 'Rishabh Verma',
                                        userPassword: '12345678',
                                        isLogout: false,
                                        isAdmin : false,
                                        isCustomer: true,
                                        isHost: false,
                                        userId: '123456'
                                }
                            }
                            storeAPI.dispatch({
                                status: 'Success',
                                type: 'AUTHORIZE_USER_REDUCER',
                                payload: output.data
                            })

                        })
                        .catch(err=>{
                            storeAPI.dispatch({
                                status: 'Failure',
                                type: 'AUTHORIZE_USER_REDUCER',
                                payload: (err && err.massage) || 'Some internal error'
                            })
                        })
    }
    next(action)
}
