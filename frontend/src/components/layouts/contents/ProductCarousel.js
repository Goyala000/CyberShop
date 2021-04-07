import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import Spinner from './Spinner';
import { listTopProducts } from '../../../actions/productActions';

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated;

    useEffect(() => {
        dispatch(listTopProducts())
    },[dispatch])
    return loading ? <Spinner /> : error ? <Message variant='primary' message={error} /> : (
        <Carousel pause='hover' className='bg-dark container carouselBox'>
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                    <Image src={product.image} alt={product.name} />
                        <Carousel.Caption className='carousel-caption'>
                            <p className="carouselHeading">{product.name} (Rs. {product.price})</p>
                        </Carousel.Caption>
                    
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel;
