import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Product from '.././Product';
import { listProducts } from '../../actions/productActions';
import Spinner from './contents/Spinner';
import Message from './contents/Message';
import Paginate from '../layouts/contents/Paginate';

const Landing = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList);
    const { products, error, loading, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <div className="container">
            <h1 className="my-5 text-center">Available Products</h1>
            {loading ? 
                <Spinner /> : error ? 
                <Message message={error}/> : 
                (
                <>
                    <Row>
                        {products && products.map(product => (
                            <Col key={product._id} lg={4} sm={12} xl={3} md={6}>
                                <Product product={product} />
                            </Col>
                        ))};
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                </>
                )
            }
            
        </div>
    );
};

export default Landing;
