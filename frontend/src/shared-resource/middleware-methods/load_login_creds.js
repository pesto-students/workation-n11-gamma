// https://redux.js.org/tutorials/fundamentals/part-6-async-logic
import axios from "axios"
import { toast } from 'react-toastify';

toast.configure()

const notify = async (data) => {
    toast.error(`${data} !`,{theme: 'dark'})
}

const isAuthenticated = async ()=>{
    return await axios("/isAuth",{method: "GET"})
    .then(data=>data)
    .catch(err => {
      console.log(err.response.data,"verifying error");
      throw ({
        statusCode: 401,
        message: err.response.data.message
      })
    })
  }

export const load_login_creds = (storeAPI)=>(next)=>async(action)=>{
    if (action.type === 'LOAD_CUSTOMER_LOGIN'){
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
                        //    history.push("/")
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
    }

//     if (action.type === 'REGISTER_GUEST'){
//         storeAPI.dispatch({
//             status: 'Initiated',
//             type: 'REGISTER_GUEST_REDUCER',
//         })
//      await axios.post("/v1/guestLogin",{...action.payload})
//             .then((res)=>{
//                 const output = {
//                     data : {
//                             isLogin: true,
//                             userEmail: res.data.email,
//                             userName: 'Rishabh Verma',
//                             userPassword: '',
//                             isLogout: false,
//                             isAdmin : false,
//                             isCustomer: true,
//                             isHost: false,
//                             userId: res.data.id,
//                             token: res.data.token
//                     }
//                 }
//                 storeAPI.dispatch({
//                     status: 'Success',
//                     type: 'REGISTER_GUEST_REDUCER',
//                     payload: output.data
//                 })
//             //    history.push("/")
//             window.location.href="/"

//             })
//             .catch(err=>{
//                 notify(err.response.data.error)
//                 storeAPI.dispatch({
//                     status: 'Failure',
//                     type: 'REGISTER_GUEST_REDUCER',
//                     error: (err && err.response.data.error) || 'Some internal error'
//                 })
//             })
// }

    if (action.type === 'UPDATE_USER'){
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
                error: (error && error.message) || 'Some internal error'
            })
            })
        }

    if (action.type === 'LOGOUT_AUTHORIZE'){
        storeAPI.dispatch({
            status: 'Initiated',
            type: 'LOGOUT_USER_REDUCER',
        })
     await axios.post("/logout",{...action.payload})
            .then((res)=>{
                console.log(res);
                const output = {
                    data : {
                            isLogin: false,
                            userEmail: '',
                            userName: '',
                            userPassword: '',
                            isLogout: true,
                            isAdmin : false,
                            isCustomer: false,
                            isHost: false,
                            userId: '',
                            token: ''
                    }
                }
                storeAPI.dispatch({
                    status: 'Success',
                    type: 'LOGOUT_USER_REDUCER',
                    payload: null
                })
            //    history.push("/")
            window.location.href='/'

            })
            .catch(err=>{
                notify(err.response.data.error)
                storeAPI.dispatch({
                    status: 'Failure',
                    type: 'LOGOUT_USER_REDUCER',
                    error: (err && err.response.data.error) || 'Some internal error'
                })
            })
}

if (action.type === 'IS_LANDING_SEARCH_AVAILABLE'){
    console.log(action.payload);
 await axios.post("/isPlaceAvailable",{...action.payload})
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
}

if (action.type === 'LANDING_SEARCH_ON_BUDGET'){
        //    console.log(action.payload);
        await axios.post("/getSearchPlace",{...action.payload})
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
}

    next(action)
}
