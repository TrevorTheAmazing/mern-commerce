import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers.js'

//connect all the reducers, middleware, etc

const reducer = combineReducers({
    productList: productListReducer, 
    productDetails: productDetailsReducer, 
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
})

const cartItemsFromStorage = window.localStorage.getItem('cartItems') ? JSON.parse(window.localStorage.getItem('cartItems')) : []

const userInfoFromStorage = window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = window.localStorage.getItem('shippingAddress') ? JSON.parse(window.localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store