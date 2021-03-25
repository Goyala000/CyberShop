import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../layouts/contents/Message';
import { getUserDetails, updateUserDetails } from '../../actions/userActions';

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

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if(!user.name) {
                dispatch(getUserDetails('profile'))
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
        } else {
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
                        {showError && <Message message={msg}></Message>}
                        {error && <Message message={error}></Message>}
                        {success && <Message message="Profile Updated"></Message>}
                        <section>
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
                                    <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                    </Form.Text>
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
            </Col>
        </Row>
    )
}

export default UserProfile;
