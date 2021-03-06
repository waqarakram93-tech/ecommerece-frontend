import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navigation from './components/Navigation';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SingleProduct from './components/SingleProduct';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Orders from './components/Orders';
import Success from './components/Success';
import Cancel from './components/Cancel';
import Admin from './components/Admin'
import Categories from './components/Categories';
import Products from './components/Products';
import SubCategories from './components/SubCategories';
import AuthState from './context/AuthContext';
import EcommerceState from './context/EcommerceContext';
import './App.css';



const App = () => {

  return (
    <>
      <AuthState>
        <EcommerceState>
          <Navigation />
          <Container>
            <Row className='mt-5 justify-content-center'>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/login' component={LogIn} />
                <Route exact path='/product/:id' component={SingleProduct} />
                <ProtectedRoute exact path='/cart' component={Cart} />
                <ProtectedRoute exact path='/checkout' component={Checkout} />
                <ProtectedRoute exact path='/admin' component={Admin} admin />
                <ProtectedRoute exact path='/orders' component={Orders} />
                <ProtectedRoute exact path='/orders/success' component={Success} />
                <ProtectedRoute exact path='/orders/cancel' component={Cancel} />
                <ProtectedRoute exact path='/admin/categories' component={Categories} admin />
                <ProtectedRoute exact path='/admin/subcategories' component={SubCategories} admin />
                <ProtectedRoute exact path='/admin/products' component={Products} admin />
              </Switch>
            </Row>
          </Container>
        </EcommerceState>
      </AuthState>
    </>
  );
};

export default App;
