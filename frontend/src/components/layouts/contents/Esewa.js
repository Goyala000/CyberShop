import React from 'react';
import { Button } from 'react-bootstrap';

const Esewa = ({amount, id}) => {

    const paymentHandler = (e) => {
        e.preventDefault();
        var path = "https://uat.esewa.com.np/epay/main";
        var params = {
            amt: Number(amount),
            psc: 0,
            pdc: 0,
            txAmt: 0,
            tAmt: amount,
            pid: String(id),
            scd: "EPAYTEST",
            su: "http://localhost:3000/esewa/success",
            fu: "http://localhost:3000/esewa/fail"
        }

        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);

        for(var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit();
    }

    return (  
        <Button onClick={paymentHandler}>Pay with eSewa</Button>
        
    )
}

export default Esewa;
