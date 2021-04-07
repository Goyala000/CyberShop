import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Product from '.././Product';
import { listProducts } from '../../actions/productActions';
import Spinner from './contents/Spinner';
import Message from './contents/Message';
import ProductCarousel from './contents/ProductCarousel';
import Meta from '../layouts/contents/Meta';

const Landing = ({ match }) => {
    const keyword = match.params.keyword

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList);
    const { products, error, loading } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <>
        <Meta />
        {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light btn-outline-primary bckBtn'>Go Back</Link>}
        <div className="container">
            <h1 className="my-5 text-center">Available Products</h1>
            {loading ? 
                <Spinner /> : error ? 
                <Message variant='primary' message={error}/> : 
                (
                    <Row>
                        {products && products.map(product => (
                            <Col key={product._id} lg={4} sm={12} xl={3} md={6}>
                                <Product product={product} />
                            </Col>
                        ))};
                    </Row>
                )
            }
        </div>
        </>
    );
};

export default Landing;
