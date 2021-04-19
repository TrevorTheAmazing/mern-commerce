import axios from 'axios'
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,    
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', { email, password }, config)


        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    
    localStorage.removeItem('userInfo')

    dispatch({ type: USER_LOGOUT })

}

// export const addToCart = (id, qty) => async (dispatch, getState) => {
//     const { data } = await axios.get(`/api/products/${id}`)

//     dispatch({
//         type: USER_LOGOUT,
//         payload: {
//             // product: data._id,
//             // name: data.name, 
//             // image: data.image,
//             // price: data.price,
//             // countInStock: data.countInStock,
//             // qty,
//         },
//     })

//     //localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
// }


// export const removeFromCart = (id) => (dispatch, getState) => {
//     dispatch({
//         type: CART_REMOVE_ITEM,
//         payload: id
//     })

//     localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
// }