import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <Spinner style={{
            height: '80px',
            width: '80px',
            display: 'block',
            margin: 'auto',
            color: '#1a1a1a',
            borderWidth: '8px'
        }} animation="border"/>
    )
}

export default Loader;
