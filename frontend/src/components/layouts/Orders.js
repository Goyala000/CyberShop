import React, { useEffect } from 'react';
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from './contents/Message';
import Meta from '../layouts/contents/Meta';
import { deliverOrder, getOrderDetails } from '../../actions/orderActions';
import Esewa from './contents/Esewa';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../../actions/types';

import Spinner from '../layouts/contents/Spinner';

const Orders = ({ match, history }) => {
    const orderId = match.params.id;

    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading:loadingDeliver, success:successDeliver } = orderDeliver;

    const orderPay = useSelector((state) => state.orderPay)
    const { success } = orderPay;

    if(!loading) {
        // Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num*100)/100).toFixed(2)
        };

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc,item) => acc + item.price * item.qty, 0)
        )
    }
    

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        }
        if(!order || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET})
            dispatch({ type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        } if(success) {
            window.location.reload()
        }
    }, [dispatch, orderId, order, successDeliver, userInfo, success])

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }
    
    return loading ? <Spinner /> : error ? <Message variant='primary' message={error} /> : <>
        <h2 className='ordName'>Order { order._id }</h2>
        <Meta title={`Order ${order._id}`} />
        <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <div>
                                <strong>Name: </strong>{order.user.name}<br></br>
                                <strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </div>
                            <p>
                                <strong>
                                <i className="fas fa-home mr-2" />
                                    Address: 
                                </strong>
                                {'  '}{order.shippingAddress.address}, {order.shippingAddress.city}{' '},
                                {' '} {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <><Message variant="warning" message={`Delivered on ${order.deliveredAt.substring(0,10)}`} /></> :
                            <Message variant="primary" message='Not Delivered' />}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>
                                <i className="fas fa-money mr-2" />
                                    Method: 
                                </strong>
                                {'  '}{order.paymentMethod}
                            </p>
                            {order.isPaid ? <><Message variant="warning" message={`Paid on ${order.paidAt.substring(0,10)}`} /></> :
                            <Message variant="primary" message="Not Paid" />}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message variant='primary' message='Order is Empty' /> : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} 
                                                    fluid rounded className='ordImg'/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product }`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={5}>
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
                                    <Col>Rs.{order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>Rs.{order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>Rs.{order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>Rs.{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                        
                        {!order.isPaid && (
                            <ListGroup.Item>
                                <Esewa amount={order.totalPrice} id={orderId} />
                            </ListGroup.Item>
                        )}
                        {loadingDeliver && <Spinner />}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                    Mark as Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row> 
    </>
}

export default Orders;
