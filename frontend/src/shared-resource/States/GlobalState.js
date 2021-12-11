// import { Action } from "history"



const initialState = {
    admin : {

        user: {
            status : 'NotStarted',
            data : null,
            error : ''
        }
         
    },

    host : {
        user: {
            status : 'NotStarted',
            data : null,
            error : ''
        }
    },

    customer : {
        user: {
            status : 'NotStarted',
            data : null,
            error : ''
        }
    },

    user : {
        status : 'NotStarted',
        user : {
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
       },
       error: ''
    }

}

export {initialState}