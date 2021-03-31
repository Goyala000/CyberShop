import React, { useEffect } from 'react';
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import Message from './contents/Message';
import { createOrder, getOrderDetails } from '../../actions/orderActions';
import Esewa from './contents/Esewa';

const Orders = ({ match }) => {
    const orderId = match.params.id;

    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails;

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
        dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId])
    
    return loading ? <loading /> : error ? <Message>{error}</Message> : <>
        <h2>Order { order._id}</h2>
        <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <div>
                                <strong>Name: </strong>{order.user.name}
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
                            <p>
                            <i className="fas fa-phone mr-2" />
                                {order.shippingAddress.phoneNumber} 
                            </p>
                            {order.isDelivered ? <Message variant='sucess'>Delivered on {order.deliveredAt}</Message> :
                            <Message variant="danger">Not Delivered</Message>}
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
                            {order.isPaid ? <Message variant='sucess'>Paid on {order.paidAt}</Message> :
                            <Message variant="danger">Not Paid</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>Order is Empty</Message> : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} 
                                                    fluid rounded />
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
                        </ListGroup>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                <Esewa amount="400" id={orderId} />
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row> 
    </>
}

export default Orders;
