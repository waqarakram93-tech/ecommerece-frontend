import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import SinglePost from './components/SinglePost';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';

const App = () => {
  return (
    <Fragment>
      <Navigation />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/new' component={CreatePost} />
        <Route exact path='/edit' component={EditPost} />
        <Route exact path='/post/:id' component={SinglePost} />
        <Route />
      </Switch>
    </Fragment>
  );
};

export default App;
