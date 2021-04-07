import React, { useState, useEffect, Fragment } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from './contents/FormContainer';
import { useSelector, useDispatch } from 'react-redux';

import CheckoutSteps from '../layouts/contents/CheckoutSteps';
import { savePaymentMethod } from '../../actions/cartActions';
import Meta from './contents/Meta';

const Payment = ({history}) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart;

    if(!shippingAddress) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('Esewa')

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        }
    }, [userInfo, history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/confirmation')
    }

    return (
        <Fragment>
            <Meta title='Payment' />
            <CheckoutSteps step1 step2 step3/>
            <FormContainer>
            <h2>Payment</h2>
                <Form onSubmit={submitHandler} style={{marginBottom: '80px'}}>
                    <Form.Group>
                        <Form.Label as='legend'>Select Payment Method...</Form.Label>
                    </Form.Group>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label='Esewa'
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
                            value='Cash On Delivery'
                            onChange={(e) => setPaymentMethod(e.target.value)}>    
                        </Form.Check>
                    </Col>
                    <Button style={{marginTop: "30px"}} type="submit" className="btn btn-info">Continue</Button>
                </Form>
            </FormContainer>
        </Fragment>
    )
}

export default Payment;
