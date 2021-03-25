import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import emptyCartImg from '../../assets/empty-cart.png';

const EmptyCart = () => {
    return (
        <div className="container noCart">
            <div>
                <Image className="cartImg" src={emptyCartImg} width="300px" height="300px"/>
            </div>
            <div className="emptyCartText">
                <h3><strong>Your Cart is Empty :(</strong></h3>
                <p>Add something to make me happy :)</p>
                <LinkContainer to="/">
                    <Button className="btn-success">Continue Shopping</Button>
                </LinkContainer> 
            </div>
        </div>
    )
}

export default EmptyCart;
