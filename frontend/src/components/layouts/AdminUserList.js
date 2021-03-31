import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { listUsers, deleteUser } from '../../actions/userActions';

import Message from '../layouts/contents/Message';
import Spinner from '../layouts/contents/Spinner';

const AdminUserList = ({ history }) => {
    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList);
    const { loading, users, error } = userList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector(state => state.userDelete);
    const { success:successDelete } = userDelete;


    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <div className="container">
            <h2>Users</h2>
            {loading ? <Spinner /> : error ? <Message variant="danger">{error}</Message> : (
                <Table striped hover responsive bordered className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th> 
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? <i className='fas fa-check' style={{color: 'blue'}}></i> : (
                                     <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}</td>
                                <td>
                                    <LinkContainer to={`user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                             <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" onClick={() => 
                                    deleteHandler(user._id)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default AdminUserList;
