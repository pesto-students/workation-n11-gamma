import {loadCustomer, authorizeUserLogin} from '../middleware-methods/load-customer-user'

const AllMiddleware = [
    loadCustomer,
    authorizeUserLogin
]

export {AllMiddleware}