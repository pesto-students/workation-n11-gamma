import {loadCustomer, authorizeUserLogin} from '../middleware-methods/load-customer-user'
import {load_login_creds} from '../middleware-methods/load_login_creds'

const AllMiddleware = [
    loadCustomer,
    authorizeUserLogin,
    load_login_creds
]

export {AllMiddleware}