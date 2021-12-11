// https://redux.js.org/tutorials/fundamentals/part-6-async-logic
import axios from "axios"

export var random = (storeAPI)=>(next)=>(action)=>{
    // console.log("calling middle ware");
    next(action)
}


export var loadCustomer = (storeAPI)=>(next)=>async(action)=>{
    next(action)
}


export var authorizeUserLogin = (storeAPI)=>(next)=>async(action)=>{
    if (action.type === 'LOGIN_AUTHORIZE'){
        console.log("calling here");
                    storeAPI.dispatch({
                        status: 'Initiated',
                        type: 'AUTHORIZE_USER_REDUCER',
                    })
                 await axios.get("/authorize")
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
