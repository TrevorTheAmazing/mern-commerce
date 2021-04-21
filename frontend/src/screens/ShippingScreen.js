import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    // const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    // const userRegister = useSelector(state => state.userRegister)
    // const { loading, error, userInfo } = userRegister

    // const redirect = location.search ? location.search.split('=')[1] : '/'

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            {/* {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>} */}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='text'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='address' placeholder='Enter address' value={address} required onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='txet' placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control type='text' placeholder='Enter postal code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen