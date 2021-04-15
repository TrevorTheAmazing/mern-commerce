import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'

//connect all the reducers, middleware, etc

const reducer = combineReducers({
    productList: productListReducer, 
    productDetails: productDetailsReducer, 
    cart: cartReducer,
})

const cartItemsFromStorage = window.localStorage.getItem('cartItems') ? JSON.parse(window.localStorage.getItem('cartItems')) : []

const initialState = {
    cart: { cartItems: cartItemsFromStorage, },
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store