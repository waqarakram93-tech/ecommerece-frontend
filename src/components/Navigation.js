import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { AuthContext } from '../context/AuthContext';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const Navigation = () => {
  const { isAuthenticated, profile, signOut } = useContext(AuthContext);

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          eCommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Form className="d-flex mx-auto">
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Button variant="outline-success ">Search</Button>
          </Form>
          <Nav className='ms-auto'>
            <Nav.Link as={NavLink} to='/' exact>
              Home
            </Nav.Link>
            {isAuthenticated ? (
              <>
                {profile.role === 'admin' && <Nav.Link as={NavLink} to='/admin'>Admin</Nav.Link>}
                <Nav.Link onClick={signOut}>Log out</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to='/signup' exact>
                  Sign up
                </Nav.Link>
                <Nav.Link as={NavLink} to='/login' exact>
                  Log in
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
};

export default Navigation;
