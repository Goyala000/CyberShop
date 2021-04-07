import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EsewaFail = () => {
    return (
        <div className="container eSewaFail">
            <h3>Esewa Payment Failed :(</h3>
            <Link to='/'>
                <Button style={{ backgroundColor: '#61bc47', marginTop: '10px' }}>Go Back</Button>
            </Link>
        </div>
    )
}

export default EsewaFail;
