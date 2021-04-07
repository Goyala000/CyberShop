import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderDetails, payOrder } from '../../../actions/orderActions';

const EsewaSuccess = ({ history }) => {
    const cart = useSelector(state => state.cart)

    // Calculate Price
    cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc+item.price*item.qty,0)
    cart.shippingPrice = 0;
    cart.taxPrice = 0;
    cart.totalPrice = Number(cart.itemsPrice)+  Number(cart.shippingPrice) +  Number(cart.taxPrice);

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay)
    const { success } = orderPay;

    useEffect(() => { 
        const orderId = window.location.search.split("=")[1].split("&")[0];
        const refId = window.location.search.split("=")[3];
        if(userInfo && orderId) {
            const paymentResult = {
                id: refId,
                status: "completed",
                update_time: Date.now(),
                email_address: userInfo.email
            }
            console.log(paymentResult)

            if(!order || success) {
                dispatch(getOrderDetails(orderId))
            } else {
                const res = axios.post(`https://uat.esewa.com.np/epay/transrec?amt=${order.totalPrice}&rid=${refId}&pid=${orderId}&scd=EPAYTEST`)
                .then((res) => {
                    return res.data;
                }).then((str) => {
                    const check = str[27];
                    if(check.toLowerCase() === "s") {
                        dispatch(payOrder(orderId, paymentResult));
                        if(success) {
                            history.push(`/order/${orderId}`);
                        } else {
                            history.push(`/order/${orderId}`);
                        }
                    }
                })
            }

        }
        
    },[success, order, dispatch, history, userInfo])
    return (
        <div style={{marginBottom: '300px'}}>
            <h2>Please wait for a while...</h2>
        </div>
    )
}

export default EsewaSuccess;
