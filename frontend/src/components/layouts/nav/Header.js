import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FinalLogo from '../../../assets/FinalLogo.jpg';
import { Nav, Navbar, Image, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logOut } from '../../../actions/userActions';

const Header = () => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logOut());
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" fixed="top">
            <LinkContainer to="/">
                <Navbar.Brand href="#home">
                    <Image src={FinalLogo} width="230px" alt="CyberShop" ></Image>
                </Navbar.Brand>
            </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart fa-2x pt-3 pr-4"></i>
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown style={{ marginTop: 18 }} title={userInfo.name} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                             {'   '} Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        <i className="fas fa-sign-out-alt"></i>
                                        {'   '} Log Out
                                    </NavDropdown.Item>
                                 </NavDropdown>
                            ) :  <LinkContainer to="/login">
                                    <Nav.Link>
                                        <p className="pt-3">
                                            Login
                                        </p>
                                    </Nav.Link>
                                </LinkContainer>
                            }
                        </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;