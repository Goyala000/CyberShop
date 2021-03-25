import React, { useEffect } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, RemoveFromCart } from '../../actions/cartActions';
import EmptyCart from './EmptyCart';

const CartScreen = ({ match, history, location }) => {
    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split('=')[1]) : 1    

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeCartBtn = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(RemoveFromCart(id))
        } 
    }

    const checkOutHandler = (e) => {
        e.preventDefault();
        history.push('/login?redirect=shipping')
    }

    return (
        <>
        {(cartItems.length === 0) ? 
            <EmptyCart />
        :
        <div className="container">
            <section>
                <div className="row">

                    <div className="col-lg-8">

                        <div className="mb-3">
                            <div className="pt-4 wish-list">

                                <h5 className="mb-4">Cart (<span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span> items)</h5>
                                {cartItems.map(item => (
                                    <section>

                                    <div className="row mb-4">
                                        <div className="col-md-5 col-lg-3 col-xl-3">
                                        <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                                            <Image className="img-fluid w-100"
                                            src={item.image} alt="Sample" />
                                        </div>
                                        </div>
                                    <div className="col-md-7 col-lg-9 col-xl-9">
                                    <div>
                                        <div className="d-flex justify-content-between">
                                        <div>
                                            <h4>{item.name}</h4>
                                            <p className="mb-3 text-muted text-uppercase small">Brand: {item.brand}</p>
                                            <p className="mb-2 text-muted text-uppercase small">Color: {item.color}</p>
                                        </div>
                                        <div>
                                        <div className="def-number-input number-input safari_only mb-0 w-100">
                                            <Form.Control as="select" value={item.qty} 
                                            onChange={(e) => dispatch(addToCart(item.product,
                                                Number(e.target.value)))}
                                            >
                                                {[...Array(item.countInStock).keys()].map((x) =>
                                                (
                                                    <option key={x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </div>
                                        </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <a onClick={() => removeCartBtn(item.product)} type="button" className="card-link-secondary small text-uppercase mr-3"><i
                                                    className="fas fa-trash-alt mr-1"></i> Remove item </a>
                                            </div>
                                            <p className="mb-0"><span><strong id="summary">Rs. {item.price*item.qty}</strong></span></p>
                                        </div>
                                    </div>        
                                </div>
                            </div> 
                                <hr className="mb-4" />
                                </section>
                                ))}

                        
                
          <p className="text-primary mb-0"><i className="fas fa-info-circle mr-1"></i> Do not delay the purchase, adding
            items to your cart does not mean booking them.</p>

    </div>
        </div>
            <div className="mb-3">
                <div className="pt-4">

                <h5 className="mb-4">Expected shipping delivery</h5>

                <p className="mb-0"> Thu., 12.03. - Mon., 16.03.</p>
                </div>
            </div>
                <div className="mb-3">
                    <div className="pt-4">

                    <h5 className="mb-4">We accept</h5>

                    <img className="mr-2" width="45px"
                        src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                        alt="Visa"/>
                    <img className="mr-2" width="45px"
                        src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                        alt="Mastercard"/>
                    </div>
                </div>
                    </div>
                    <div className="col-lg-4">

                    <div className="mb-3">
                        <div className="pt-4">

                        <h5 className="mb-3">The total amount of</h5>

                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            Temporary amount
                            <span>{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                            Shipping
                            <span>0.00</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                            <div>
                                <strong>The total amount of</strong>
                                <strong>
                                <p className="mb-0">(including VAT)</p>
                                </strong>
                            </div>
                            <span><strong>{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</strong></span>
                            </li>
                        </ul>

                        <Button type="button" onClick={checkOutHandler} className="btn btn-primary btn-block">go to checkout</Button>

                        </div>
                    </div>

    </div>

  </div>

</section>
</div>
    }
    </>
    )
}

export default CartScreen;
