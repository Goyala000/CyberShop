import React, { useState, useEffect } from 'react';
import FormContainer from '../layouts/contents/FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions/userActions';
import Message from '../layouts/contents/Message';
import Spinner from '../layouts/contents/Spinner';
import Meta from './contents/Meta';

const Register = ({location, history}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [msg, setMsg] = useState('');

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setShowError(true)
            setMsg('Passwords do not match')
        } else {
            setShowError(false)
            dispatch(register(name, email, password))
        }
    };

    return (
        <FormContainer>
                <h1 style={{margin: 20, textAlign: "center" }}>REGISTER</h1>
                <Meta title='Register' />
                <div>
                    {showError && <Message variant='primary' message={msg} />}
                    {error && <Message variant='primary' message={error} />}
                    {loading && <Spinner />}
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
                            <Button type="submit" className="btn btn-info">Register</Button>
                        </Form>
                    </section>
                    <Row className='py-3'>
                        <Col>
                            Have an Account ? <Link to={redirect ? `/login?redirect=${redirect}`
                            : '/login'}><strong>Login</strong></Link>   
                        </Col>
                    </Row>
                </div>
        </FormContainer>
    )
}

export default Register;
