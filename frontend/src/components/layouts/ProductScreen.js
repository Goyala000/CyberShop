import React, {useEffect, useState} from 'react';
import { Image, Button, FormControl } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../Rating';
import { productDetail } from '../../actions/productActions';
import Spinner from './contents/Spinner';
import Message from './contents/Message';

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);

  const { loading, error, product } = productDetails;


  useEffect(() => {
    dispatch(productDetail(match.params.id))
  }, [dispatch, match])

  const addToCartBtn = () => {
       history.push(`/cart/${match.params.id}?qty=${qty}`)
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
        </section>
        }
      </div>
      </div>
    );
};

export default ProductScreen;