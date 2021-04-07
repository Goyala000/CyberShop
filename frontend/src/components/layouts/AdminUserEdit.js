import React, { useState, useEffect, Fragment } from 'react';
import FormContainer from '../layouts/contents/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetails, updateUser } from '../../actions/userActions';
import { USER_UPDATE_RESET } from '../../actions/types';

import Message from '../layouts/contents/Message';
import Spinner from '../layouts/contents/Spinner';
import Meta from './contents/Meta';

const AdminUserEdit = ({match, history}) => {
    const userId = match.params.id;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate;

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userList')
        } else {
            if(!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, history, dispatch, userId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    };

    return (
        <Fragment>
            <Meta title='User Edit' />
            <Link to='/admin/userList' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1 style={{margin: 20, textAlign: "center" }}>Edit User</h1>
                {loadingUpdate && <Spinner />}
                {errorUpdate && <Message variant="primary" message={errorUpdate} />}
                {loading ? <Spinner /> : error ? <Message variant="primary" message={error} />: (
                    <div>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Enter name..." 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter email..." 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}/>
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="isAdmin">
                                <Form.Check
                                    type="checkbox"
                                    label="is Admin"
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}>
                                </Form.Check>
                            </Form.Group>
                            <Button type="submit" className="btn btn-small">Update</Button>
                        </Form>
                    </div>
                )}
            </FormContainer>
        </Fragment>
    )
}

export default AdminUserEdit;
