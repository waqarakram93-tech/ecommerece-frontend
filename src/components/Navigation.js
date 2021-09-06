import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { AuthContext } from '../context/AuthContext';
import { EcommerceContext } from '../context/EcommerceContext';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Navigation = () => {
  const { isAuthenticated, profile, signOut } = useContext(AuthContext);
  const { cart } = useContext(EcommerceContext);

  return (
    <Navbar bg='info' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Knives-Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Form className="d-flex mx-auto">
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Button variant="secondary ">Search</Button>
          </Form>
          <Nav className='ms-auto'>
            <>
              <Nav.Link as={NavLink} to='/cart' exact>
                <FontAwesomeIcon icon={faShoppingCart} color='darkgrey' />
                <Badge bg="secondary">{cart.length}</Badge>
              </Nav.Link>
              <Nav.Link as={NavLink} to='/' exact>
                Store
              </Nav.Link>
            </>
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
