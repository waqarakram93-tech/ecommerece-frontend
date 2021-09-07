import { useContext } from 'react';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { EcommerceContext } from '../context/EcommerceContext'
import Footer from './Footer'

function Home() {
    const { error, products, cart, checkCart, addToCart, decreaseFromCart, removeFromCart } = useContext(EcommerceContext)
    const [visible, setVisible] = useState(3);

    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 3);
    }
    return (
        <Row className='mt-1'>
            {products.map(p => (
                <Col md={4} className='mb-4' key={p.id}>
                    <Card className='h-100' >
                        <Carousel >
                            {
                                p.images.slice(0, visible).map(img => (<Carousel.Item interval={1500} key={img.id}>
                                    <Card.Img variant="top" src={img.url} />
                                </Carousel.Item>))
                            }
                        </Carousel>
                        <Card.Body>
                            <Card.Title className='title' as={Link} to={`/product/${p.id}`}>{p.name}</Card.Title>
                            <Card.Text>
                                {`${p.description.substring(0, 1000)}`}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className='stock'>Only {p.stock} LEFT </Card.Footer>
                        <Card.Footer className='price'>Price: {p.price} EUR  </Card.Footer>
                        {
                            checkCart(p) ?
                                <Button variant="danger" onClick={() => removeFromCart(p)}>Remove from cart</Button> :
                                <Button variant="primary" onClick={() => addToCart(p)}>Add to cart</Button>
                        }
                    </Card>
                </Col>
            ))}
            <Row>
                <div className="d-flex col-md-12 justify-content-center">
                    <Button variant="info w-25" onClick={showMoreItems}>See More</Button>
                </div>
            </Row>
            <Footer />
        </Row>
    )
}


export default Home


