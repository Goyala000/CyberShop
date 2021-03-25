import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './layouts/nav/Header';
import Landing from './layouts/Landing';
import ProductScreen from './layouts/ProductScreen';
import Footer from './layouts/nav/Footer';
import Login from './layouts/Login';
import Register from './layouts/Register';
import CartScreen from './layouts/CartScreen';
import UserProfile from './layouts/UserProfile';
import Shipping from './layouts/Shipping';
import Payment from './layouts/Payment';
import Confirmation from './layouts/Confirmation';
import Orders from './layouts/Orders';


const App = props => {
    return (
        <Router>
            <Header />
                <div style={{marginTop: 90}}>
                    <Route path='/' component={Landing} exact />
                    <Route path='/login' component={Login} exact />
                    <Route path='/register' component={Register} exact />
                    <Route path='/profile' component={UserProfile} />
                    <Route path='/product/:id' component={ProductScreen} exact />
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/shipping' component={Shipping} />
                    <Route path='/payment' component={Payment} />
                    <Route path='/confirmation' component={Confirmation} />
                    <Route path='/order/:id' component={Orders} />
                </div>
        </Router>     
    );
};

export default App;
