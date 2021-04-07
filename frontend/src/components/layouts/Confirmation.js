import React, { useEffect } from 'react';
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from './contents/CheckoutSteps';
import { Link } from 'react-router-dom';
import Message from './contents/Message';
import { createOrder } from '../../actions/orderActions';
import Meta from './contents/Meta';

const Confirmation = ({ history }) => {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)

    // Calculate Price
    cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc+item.price*item.qty,0)
    cart.shippingPrice = 0;
    cart.taxPrice = 0;
    cart.totalPrice = Number(cart.itemsPrice)+  Number(cart.shippingPrice) +  Number(cart.taxPrice);

    const orderCreate = useSelector(state => state.orderCreate)

    const { order, success, error } = orderCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        }
        if(success) {
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success, userInfo])
    
    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <Meta title='Confirmation' />
            <Row style={{marginBottom: '70px'}}>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2 style={{color: 'blue'}}>Shipping</h2>
                            <p>
                                <strong>
                                <i className="fas fa-home mr-2" />
                                    Address: 
                                </strong>
                                {'  '}{cart.shippingAddress.address}, {cart.shippingAddress.city}{' '},
                                {' '} {cart.shippingAddress.country}
                            </p>
                            <p>
                            <i className="fas fa-phone mr-2" />
                                {cart.shippingAddress.phoneNumber} 
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 style={{color: 'blue'}}>Payment Method</h2>
                            <p>
                                <strong>
                                <i className="fas fa-money mr-2" />
                                    Method: 
                                </strong>
                                {'  '}{cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2 style={{color: 'blue'}}>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message variant='primary' message="Your Cart is Empty" /> : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} 
                                                    fluid rounded className='imgName'/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product }`}>
                                                        <p>{item.name}</p>
                                                    </Link>
                                                </Col>
                                                <Col md={5} style={{fontSize: '15px'}}>
                                                    {item.qty} x Rs.{item.price} = Rs.{item.qty * 
                                                    item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>Rs.{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>Rs.{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>Rs.{cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>Rs.{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='primary' message={error} />}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type="button" className='btn-block btn-info' disabled={
                                    cart.cartItems===0
                                } onClick={placeOrderHandler}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Confirmation;
