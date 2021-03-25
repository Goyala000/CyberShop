import React, { useState, useEffect, Fragment } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from './contents/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../layouts/contents/Message';
import CheckoutSteps from '../layouts/contents/CheckoutSteps';
import { saveShippingAddress } from '../../actions/cartActions';

const Shipping = ({history}) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber)
    const [country, setCountry] = useState(shippingAddress.country);
    const [showError, setShowError] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("https://extreme-ip-lookup.com/json/");
            res
            .json()
            .then(res => setCountry(res.country))
            .catch(err => console.log(err));
        }
        fetchData();
        });
    
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if(address === "" || city === "" || phoneNumber === "") {
            setShowError(true)
            setMsg('Fields cant be empty')
        } else if(re.test(phoneNumber) === false) {
            setShowError(true)
            setMsg('Invalid Phone Number')
        } else {
            setShowError(false)
            dispatch(saveShippingAddress({address, city, phoneNumber, country}))
            history.push('/payment')
        }
    }

    return (
        <Fragment>
            <CheckoutSteps step1 step2 />
            <FormContainer>
            <h2>Shipping</h2>
                {showError && <Message message={msg}></Message>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicAddress">
                        <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder="Enter Address..." 
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}>
                            </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicCountry">
                        <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder="Country..." 
                                value={country}>
                            </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicCity">
                        <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text" 
                                placeholder="Enter City Name..." 
                                value={city}
                                onChange={(e) => setCity(e.target.value)}>
                            </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formBasicPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="number" 
                                placeholder="Enter Phone Number..." 
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}>
                            </Form.Control>
                    </Form.Group>
                    <Button type="submit" className="btn btn-info">Continue</Button>
                </Form>
            </FormContainer>
        </Fragment>
    )
}

export default Shipping;
