import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { listProducts, deleteProduct, createProduct } from '../../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../../actions/types';

import Message from '../layouts/contents/Message';
import Spinner from '../layouts/contents/Spinner';
import Meta from './contents/Meta';

const AdminProductList = ({ history }) => {
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const productDelete = useSelector(state => state.productDelete);
    const { loading:loadingDelete, success:successDelete, error:errorDelete } = productDelete;

    const productCreate = useSelector(state => state.productCreate);
    const { 
        loading:loadingCreate, 
        success:successCreate, 
        error:errorCreate,
        product: createdProduct
    } = productCreate;


    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if(!userInfo.isAdmin) {
            history.push('/login')
        } 

        if(successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <div className="container">
            <Meta title='Product List' />
            <Row className='align-items-center'>
                <Col>
                    <h2>Products</h2>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>

            </Row>
            {loadingDelete && <Spinner />}
            {errorDelete && <Message variant="primary" message={errorDelete} />}
            {loadingCreate && <Spinner />}
            {errorCreate && <Message variant="primary" message={errorCreate} />}
            {loading ? <Spinner /> : error ? <Message variant="primary" message={error} /> : (
                <>
                <Table striped hover responsive bordered className="table-sm">
                    <thead>
                        <tr>
                            <th>PRODUCT ID</th>
                            <th>NAME</th>
                            <th>PRICE</th> 
                            <th>BRAND</th>
                            <th>CATEGORY</th>
                            <th>COLOR</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>Rs.{product.price}</td>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td>{product.color}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                             <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" onClick={() => 
                                    deleteHandler(product._id)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                
                </>
            )}
        </div>
    )
}

export default AdminProductList;
