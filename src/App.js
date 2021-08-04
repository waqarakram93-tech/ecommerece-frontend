import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navigation from './components/Navigation';
import Home from './components/Home';
import SinglePost from './components/SinglePost';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import './App.css';

const App = () => {
  return (
    <main>
      <Navigation />
      <Container>
        <Row className='mt-5 justify-content-center'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/new' component={CreatePost} />
            <Route exact path='/edit' component={EditPost} />
            <Route exact path='/post/:id' component={SinglePost} />
            <Route />
          </Switch>
        </Row>
      </Container>
    </main>
  );
};

export default App;
