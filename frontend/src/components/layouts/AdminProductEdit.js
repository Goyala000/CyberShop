import React, { useState, useEffect, Fragment } from 'react';
import FormContainer from '../layouts/contents/FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { productDetail, updateProduct } from '../../actions/productActions';

import Message from '../layouts/contents/Message';
import Spinner from '../layouts/contents/Spinner';
import { PRODUCT_UPDATE_RESET } from '../../actions/types';

const AdminProductEdit = ({match, history}) => {
    const productId = match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate;

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productList')
        } else {
            if(!product.name || product._id !== productId) {
                dispatch(productDetail(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setColor(product.color)
                setDescription(product.description)
                setCountInStock(product.countInStock)
            }
        }
    }, [product, history, dispatch, productId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image, 
            brand,
            category,
            color,
            description,
            countInStock 
        }))
    };

    return (
        <Fragment>
            <Link to='/admin/productList' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1 style={{margin: 20, textAlign: "center" }}>Edit Product</h1>
                {loadingUpdate && <Spinner />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? <Spinner /> : error ? <Message variant="danger">{error}</Message> : (
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
                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="Enter price..." 
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="image">
                                <Form.Label>Image</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter image url..." 
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}/>
                            </Form.Group> 
                            <Form.Group controlId="brand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter brand..." 
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="Color">
                                <Form.Label>Color</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Color..." 
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}/>
                            </Form.Group>  
                            <Form.Group controlId="Category">
                                <Form.Label>Category</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Category..." 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}/>
                            </Form.Group> 
                            <Form.Group controlId="CountInStock">
                                <Form.Label>CountInStock</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    placeholder="Enter CountInStock..." 
                                    value={countInStock}
                                    onChange={(e) => setCountInStock(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter description..." 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}/>
                            </Form.Group> 
                            <Button type="submit" className="btn btn-small">Update</Button>
                        </Form>
                    </div>
                )}
            </FormContainer>
        </Fragment>
    )
}

export default AdminProductEdit;
