import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../layouts/contents/Message';
import Spinner from '../layouts/contents/Spinner';
import { getUserDetails, updateUserDetails } from '../../actions/userActions';
import { listMyOrders } from '../../actions/orderActions';
import Meta from './contents/Meta';

const UserProfile = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [msg, setMsg] = useState('');

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector(state => state.userDetailsUpdate);
    const { success } = userUpdate;

    const orderListMy = useSelector(state => state.orderListMy);
    const { loading:loadingOrders, error:errorOrders, orders } = orderListMy;

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if(!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, dispatch, user])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setShowError(true)
            setMsg('Passwords do not match')
        } else if(password === '' || confirmPassword === '') {
            setShowError(true)
            setMsg('Password cannot be empty')
        }
        else {
            setShowError(false)
            // Dispatch Update Profile
            dispatch(updateUserDetails({ id: user._id, name, email, password}))
        }
    };

    return (
        <Row className="container">
            <Col md={3}>
            <h3 style={{textAlign: "center" }}>User Profile</h3>
                    <div>
                        {showError && <Message variant='primary' message={msg} />}
                        {error && <Message variant='primary' message={error} />}
                        {success && <Message variant='warning' message="Profile Updated" />}
                        {loading && <Spinner />}
                        <section>
                            <Meta title={user.name} />
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        placeholder="Enter your name..." 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword1">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password"
                                        placeholder="Password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword2">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control 
                                        type="password"
                                        placeholder="Password" 
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} />
                                </Form.Group>
                                <Button type="submit" className="btn btn-info">Update</Button>
                            </Form>
                        </section>
                    </div>
                
            </Col>
            <Col md={9}>
                <h3>My Orders</h3>
                {loadingOrders ? <Spinner /> : errorOrders ? <Message variant="primary" message={errorOrders} /> :
                orders.length === 0 ? <Message variant='warning' message='You order history is empty' /> :
                (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt : (
                                        <i className='fas fa-times' style={{color: "red"}}></i>
                                    )}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.subString(0, 10) : (
                                        <i className='fas fa-times' style={{color: "red"}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className="btn-sm" variant="light">Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default UserProfile;
