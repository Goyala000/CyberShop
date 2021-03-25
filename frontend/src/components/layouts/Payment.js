import React, { useState, useEffect, Fragment } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from './contents/FormContainer';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../layouts/contents/Message';
import CheckoutSteps from '../layouts/contents/CheckoutSteps';
import { savePaymentMethod } from '../../actions/cartActions';

const Payment = ({history}) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart;

    if(!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Esewa')

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/confirmation')
    }

    return (
        <Fragment>
            <CheckoutSteps step1 step2 step3/>
            <FormContainer>
            <h2>Payment</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend'>Select Method</Form.Label>
                    </Form.Group>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label='Esewa or Credit Card'
                            id='Esewa'
                            name='paymentMethod'
                            value='Esewa'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}>
                        </Form.Check>
                        <Form.Check 
                            type="radio" 
                            label='Cash on Delivery'
                            id='CashDelivery'
                            name='paymentMethod'
                            value='CashOnDelivery'
                            onChange={(e) => setPaymentMethod(e.target.value)}>    
                        </Form.Check>
                    </Col>
                    <Button style={{marginTop: "10px"}} type="submit" className="btn btn-info">Continue</Button>
                </Form>
            </FormContainer>
        </Fragment>
    )
}

export default Payment;
