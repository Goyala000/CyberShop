import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetails, payOrder } from '../../../actions/orderActions';
import Spinner from '../contents/Spinner';

const EsewaSuccess = ({ match, history }) => {
    const cart = useSelector(state => state.cart)

    // Calculate Price
    cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc+item.price*item.qty,0)
    cart.shippingPrice = 0;
    cart.taxPrice = 0;
    cart.totalPrice = Number(cart.itemsPrice)+  Number(cart.shippingPrice) +  Number(cart.taxPrice);

    const orderId = match.params.id

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay)
    const { loading:loadingPay, success:successPay } = orderPay;



    useEffect(() => { 
        const refId = window.location.search.split("=")[3];
        if(userInfo && orderId) {
            const paymentResult = {
                id: refId,
                status: "completed",
                update_time: Date.now(),
                email_address: userInfo.email
            }

            if(!order || successPay) {
                dispatch(getOrderDetails(orderId))
            } else {
                const res = axios.post(`https://cors-anywhere.herokuapp.com/https://uat.esewa.com.np/epay/transrec?amt=${cart.totalPrice}.00&rid=${refId}&pid=${orderId}&scd=EPAYTEST`)
                .then((res) => {
                    return res.data;
                }).then((str) => {
                    const check = str[27];
                    if(check.toLowerCase() === "s") {
                        dispatch(payOrder(orderId, paymentResult));
                        if(successPay) {
                            history.push(`/order/${orderId}`);
                        } else {
                            history.push(`/order/${orderId}`);
                        }
                    }
                })
            }
        }

    },[successPay, order])
    return (
        <div>
            <h2>Please wait for a while...</h2>
        </div>
    )
}

export default EsewaSuccess;
