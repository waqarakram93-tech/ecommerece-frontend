import { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { EcommerceContext } from '../context/EcommerceContext'


function Home() {
    const { error, products } = useContext(EcommerceContext)
    return (
        <Row>
            {products.map(p => <div key={p.id}>{p.name}</div>)}
        </Row>
    )
}

export default Home
