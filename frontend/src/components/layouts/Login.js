import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../layouts/contents/FormContainer';
import { login } from '../../actions/userActions';
import Message from '../layouts/contents/Message';
import Spinner from '../layouts/contents/Spinner';
import Meta from './contents/Meta';

const Login = ({ location, history  }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(false);

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        if(email === "" || password === "") {
            setShowError(true)
        } else {
            setShowError(false)
            dispatch(login(email, password));
        }
    };

    return (
        <FormContainer>
                <h1 style={{margin: 20, textAlign: "center" }}>LOG IN</h1>
                <Meta title='Log In' />
                {loading && <Spinner />}
                <div className="loginForm">
                    <div>
                    {showError && <Message variant='primary' message="Email and password field cant be empty" />}
                    {error && <Message variant='primary' message={error} />}
                        <h3>Welcome to CyberShop</h3>
                    </div> 
                    <section>
                        <Form onSubmit={submitHandler}>
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
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type={showPassword ? "text" : "password"}
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                                <i style = {showError || error || loading ? eyeHeight : eye2Height } onClick = {
                                    (e) => setShowPassword(showPassword ? false : true)
                                } className={showPassword ? "far fa-eye-slash eye" : "far fa-eye eye"}></i>
                        </Form.Group>
                            <Button type="submit" className="btn btn-warning">Sign In</Button>
                        </Form>
                    </section>
                    <Row className='py-3'>
                        <Col>
                            New Customer ? <Link to={redirect ? `/register?redirect=${redirect}`
                            : '/register'}><strong>Register</strong></Link>   
                        </Col>
                    </Row>
                </div>
        </FormContainer>
    )
}

const eyeHeight = {
    top: "73%"
};

const eye2Height = {
    top: "69%"
}

export default Login;
