import React from 'react';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Rating from './Rating';


const Product = ({ product }) => {
    return (
        <div>
            <Card className="my-3 p-3 card shadow bg-white rounded">
                <LinkContainer to={`/product/${product._id}`}>
                    <Card.Img src={product.image} variant="top" />
                </LinkContainer>
                 
                <Card.Body>
                    <LinkContainer to={`/product/${product._id}`}>
                        <Card.Title>
                            <h4 className="productName">{product.name}</h4>
                        </Card.Title>
                    </LinkContainer>    
                    
                    <Card.Text as='div'>
                        <div className='my-2'>
                            <Rating rating={product.rating} total={product.numReviews}/>
                        </div>
                    </Card.Text>

                    <Card.Text as='div'>
                        <div className='my-3'>
                            <p className="price">Rs. {product.price}</p>
                        </div>
                    </Card.Text>

                </Card.Body>  
            </Card>
        </div>
    );
};

export default Product;