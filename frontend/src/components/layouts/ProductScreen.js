import React, {useEffect, useState} from 'react';
import { Image, Button, FormControl, ListGroup, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Rating from '../Rating';
import { productDetail, createProductReview } from '../../actions/productActions';
import Spinner from './contents/Spinner';
import Message from './contents/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../actions/types';

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [err, setErr] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const { success:successProductReview, error:errorProductReview } = productReviewCreate;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if(successProductReview) {
      alert('Review Submitted!')
      setRating(0)
      setComment('') 
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(productDetail(match.params.id))
  }, [dispatch, match, successProductReview])

  const addToCartBtn = () => {
       history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if(rating === "" || comment === "") {
      setErr(true)
    } else {
      setErr(false)
      dispatch(createProductReview(match.params.id, {
        rating,
        comment
      }))
    }
  }

    
    return (
      <div>
        <div className="container prodctScreen">
          <LinkContainer to={'/'}>
            <Button className="btnBack">Go Back</Button>
          </LinkContainer>

          {loading ? <Spinner /> : error ? 
          <Message message={error}/> :
            <section>
              <div className="row">
                <div className="col-md-6 mb-4 mt-5 mb-md-0">
                  <div className="col-12 mb-0">
                    <a href={product.image}
                      data-size="710x823">
                        <Image src={product.image}
                          className="img-fluid z-depth-1" alt={product.name}/>
                    </a>
                  </div>
                </div>

                <div className="col-md-6">
                  <h2>{product.name}</h2>
                    <p className="mb-2 text-muted text-uppercase small">{product.category}</p>
                    <p className="mt-3"><Rating
                            rating={product.rating} 
                            text={`${product.numReviews} reviews`}
                    />
                    </p>
                    <p><span className="mr-1"><strong>Price: Rs. {product.price}</strong></span></p>
                    <p className="pt-1">{product.description}</p>
                    <div className="table-responsive">
                      <table className="table table-sm table-borderless mb-0">
                        <tbody>
                          <tr>
                            <th className="pl-0 w-25" scope="row"><strong>Brand</strong></th>
                              <td>{product.brand}</td>
                          </tr>
                          <tr>
                            <th className="pl-0 w-25" scope="row"><strong>Color</strong></th>
                              <td>{product.color}</td>
                          </tr>
                          <tr>
                            <th className="pl-0 w-25" scope="row"><strong>Status</strong></th>
                              <td>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</td>
                          </tr> 
                          {product.countInStock > 0 && (
                            <tr>
                              <th className="pl-0 w-25" scope="row"><strong>Qty</strong></th>
                              <FormControl style={{width: '100px'}} as="select" value={qty} onChange={(e) => 
                                setQty(e.target.value)}>
                                  {[...Array(product.countInStock).keys()].map((x) => (
                                    <option key={x+1} value={x+1}>
                                      {x+1}
                                    </option>
                                  ))}
                              </FormControl>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                <div className="mt-4">
                  <Button onClick={addToCartBtn} disabled={product.countInStock===0} type="button" className="btn btn-primary btn-md mr-1 mb-2"><i
                    className="fas fa-shopping-cart pr-2"></i>Add to cart</Button>
                </div>        
            </div> 
          </div>
          <div style={{marginTop: '20px'}}>
            <h3>Reviews</h3>
              {product.reviews && product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews && product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating rating={review.rating} />
                    <h6>{review.createdAt.substring(0,10)}</h6>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                  <ListGroup.Item>
                      <h4>Write a Customer Review</h4>
                      {err && <Message variant='danger'>Fields cant be empty.</Message>}
                      {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId='rating'>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                              <option value=''>Select...</option>
                              <option value='1'>1- Poor</option>
                              <option value='2'>2- Fair</option>
                              <option value='3'>3- Good</option>
                              <option value='4'>4- Very Good</option>
                              <option value='5'>5- Excellent</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId='comment'>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as="textarea"
                              row='3'
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}>
                            </Form.Control>
                          </Form.Group>
                          <Button type='submit' variant='warning'>Post</Button>
                        </Form>
                      ) : <Message>Please <Link to='/login'>Login</Link>to write a review'</Message>}
                    </ListGroup.Item>
                  </ListGroup>
          </div>
        </section>
        }
      </div>
      
      </div>
    );
};

export default ProductScreen;




