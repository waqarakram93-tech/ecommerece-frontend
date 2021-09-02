import { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navigation from './components/Navigation';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
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
        <Navigation />
        <Container>
          <Row className='mt-5 justify-content-center'>
            <EcommerceState>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/login' component={LogIn} />
                <ProtectedRoute exact path='/admin' component={Admin} admin />
                <ProtectedRoute exact path='/admin/categories' component={Categories} admin />
                <ProtectedRoute exact path='/admin/subcategories' component={SubCategories} admin />
                <ProtectedRoute exact path='/admin/products' component={Products} admin />
              </Switch>
            </EcommerceState>
          </Row>
        </Container>
      </AuthState>
    </>
  );
};

export default App;
