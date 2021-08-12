import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navigation from './components/Navigation';
import Home from './components/Home';
import SinglePost from './components/SinglePost';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Register from './components/Register';
import LogIn from './components/LogIn';
import NotFound from './components/NotFound';
import './App.css';
import AuthState from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthState>
      <Navigation />
      <Container>
        <Row className='mt-5 justify-content-center'>
          <Switch>
            <Route exact path='/' component={Home} />
            <ProtectedRoute exact path='/new' component={CreatePost} />
            <Route exact path='/edit' component={EditPost} />
            <Route exact path='/post/:id' component={SinglePost} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={LogIn} />
            <Route path='*' component={NotFound} />
          </Switch>
        </Row>
      </Container>
    </AuthState>
  );
};

export default App;
