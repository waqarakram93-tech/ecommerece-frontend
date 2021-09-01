import { useState, Fragment, useContext } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { EcommerceContext } from '../context/EcommerceContext'


const Categories = () => {
    const { categories, setCategories } = useContext(EcommerceContext)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault()
        const send = { name: category }
        try {
            setLoading(true);
            const {
                data
            } = await axios.post(`${process.env.REACT_APP_ECOMMERCE_FINAL}/categories`, send, {
                headers: { Authorization: `${localStorage.getItem('token')}` }
            });
            setCategories(prev => [...prev, data])
            setCategory('')
            setLoading(false);
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
                setTimeout(() => setError(null), 3000);
                setLoading(false);
            } else {
                setError('Network error');
                setTimeout(() => setError(null), 3000);
                setLoading(false);
            }
        }
    };



    if (loading) return <Spinner animation='border' variant='primary' />;
    return (
        <Fragment>

            {
                categories && categories.map(category =>

                    <li key={category.id}>
                        {category.name}

                    </li>)
            }


            <Col>
                <Form onSubmit={onSubmit}>
                    <Row>{error && <Alert variant='danger'>{error}</Alert>}</Row>
                    <Row>
                        <Col>
                            <Form.Group className='mb-3' controlId='title'>
                                <Form.Label>Please insert Category Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Category name'
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                />

                            </Form.Group>
                        </Col>

                    </Row>


                    <Row>

                    </Row>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </Col>
        </Fragment >
    );
};

export default Categories;


