import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='mb-4 chckOut'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>
                            <i className="fas fa-sign-in-alt fa-2x circle-icon"></i>
                        </Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>
                        <i className="fas fa-sign-in-alt fa-2x circle-icon"></i>
                    </Nav.Link>
                }
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>
                            <i className="fas fa-shipping-fast fa-2x circle-icon"></i>
                        </Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>
                        <i className="fas fa-shipping-fast fa-2x circle-icon"></i>
                    </Nav.Link>
                }
            </Nav.Item>
            
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>
                            <i className="fas fa-credit-card fa-2x circle-icon"></i>
                        </Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>
                        <i className="fas fa-credit-card fa-2x circle-icon"></i>
                    </Nav.Link>
                }
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>
                            <i className="fas fa-check-double fa-2x circle-icon"></i>
                        </Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>
                        <i className="fas fa-check-double fa-2x circle-icon"></i>
                    </Nav.Link>
                }
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps;
