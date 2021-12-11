// https://redux.js.org/tutorials/fundamentals/part-6-async-logic
import axios from "axios"
import { toast } from 'react-toastify';
import * as types from "../Actions/action"
toast.configure()

const notify = async (data) => {
    toast.error(`${data} !`,{theme: 'dark'})
}

const isAuthenticated = async ()=>{
    return await axios("/v1/isAuth",{method: "GET"})
    .then(data=>data)
    .catch(err => {
      console.log(err.response.data,"verifying error");
      throw new Error({
        statusCode: 401,
        message: err.response.data.message
      })
    })
  }

export const load_login_creds = (storeAPI) => (next) => async (action) => {
    
    switch (action.type) {

        case types.loadCustomerLogin: 
            storeAPI.dispatch({
                        status: 'Initiated',
                        type: 'LOGIN_USER_REDUCER',
            })
            await axios.post("/v1/login",{...action.payload})
                        .then((res)=>{
                            const output = {
                                data : {
                                        isLogin: true,
                                        userEmail: action.payload.email,
                                        userName: 'Rishabh Verma',
                                        userPassword: '',
                                        isLogout: false,
                                        isAdmin : false,
                                        isCustomer: true,
                                        isHost: false,
                                        userId: res.data.id,
                                        token: res.data.token
                                }
                            }

                            storeAPI.dispatch({
                                status: 'Success',
                                type: 'LOGIN_USER_REDUCER',
                                payload: output.data
                            })

                        window.location.href="/"

                        })
                        .catch(err=>{
                            notify(err.response.data.error)
                            storeAPI.dispatch({
                                status: 'Failure',
                                type: 'LOGIN_USER_REDUCER',
                                error: (err && err.response.data.error) || 'Some internal error'
                            })
                        })
            next(action)
            break;
        
        case types.updateUser:
            storeAPI.dispatch({
                status: 'Initiated',
                type: 'UPDATE_USER_REDUCER',
            })
            isAuthenticated()
            .then(data=>{
              const output = {
                  data : {
                          isLogin: true,
                          userEmail:data.data.email,
                          userName: 'Rishabh Verma',
                          userPassword: '',
                          isLogout: false,
                          isAdmin : false,
                          isCustomer: true,
                          isHost: false,
                          userId:  data.data.id,
                          token: data.data.token
                  }
              }
              storeAPI.dispatch({
                status: 'Success',
                type: 'UPDATE_USER_REDUCER',
                payload: output.data
            })
              
            })
            .catch((error)=>{
               storeAPI.dispatch({
                status: 'Failure',
                type: 'UPDATE_USER_REDUCER',
                error: 'Some internal error'
            })
            })
            next(action)
            break;
        
        case types.logoutAuthorize:
            storeAPI.dispatch({
            status: 'Initiated',
            type: 'LOGOUT_USER_REDUCER',
            })
            await axios.post("/v1/logout",{...action.payload})
            .then((res)=>{

                storeAPI.dispatch({
                    status: 'Success',
                    type: 'LOGOUT_USER_REDUCER',
                    payload: null
                })

                window.location.href = '/'

            })
            .catch(err=>{
                notify(err.response.data.error)

                storeAPI.dispatch({
                    status: 'Failure',
                    type: 'LOGOUT_USER_REDUCER',
                    error: (err && err.response.data.error) || 'Some internal error'
                })
            })
            next(action)
            break;
        
        case types.isLandingSearchAvailable:
            await axios.post("/place/isPlaceAvailable",{...action.payload})
                    .then((res)=>{
                        if (res.data.isAvailable){
                        window.location.href=`/customer/${action.payload.name}?dateFrom=${action.payload.date.from}&dateTo=${action.payload.date.to}&budget=${action.payload.budget}`
                        } else {
                            notify('Sorry! Place is not available!')
                        }
                    })
                    .catch(err=>{
                        notify(err)
                    })
            
            /**
             * Description: Sample for authorization working on both side,
             * Author: Rishabh Verma
             * Warning: Please dont remove the below code
             */
            // await axios.post("/place/register",{...action.payload})
            //                 .then((res)=>{
            //                     console.log(res);
            //                     storeAPI.dispatch({
            //                         status: 'Success',
            //                         payload: res.data,
            //                         type: 'LANDING_SEARCH_BUDGET'
            //                     })
            //                 })
            //                 .catch(err=>{
            //                     notify(err.response.data.error)
            //                 }) 
            next(action)
            break;
        
        case types.landingSearchOnBudget:
            //success failure is pending
            await axios.post("/place/getSearchPlace",{...action.payload})
                            .then((res)=>{
                                console.log(res);
                                storeAPI.dispatch({
                                    status: 'Success',
                                    payload: res.data,
                                    type: 'LANDING_SEARCH_BUDGET'
                                })
                            })
                            .catch(err=>{
                                notify(err.response.data.error)
                            }) 
            next(action)
            break;
        default:
            next(action)
    }

    next(action)
}
