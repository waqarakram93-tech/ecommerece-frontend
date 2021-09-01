import { useState, Fragment, useContext } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { EcommerceContext } from '../context/EcommerceContext'

//import PostEditor from './PostEditor';

const SubCategories = () => {
    const { categories, setCategories } = useContext(EcommerceContext)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [subcategory, setSubcategory] = useState('');
    const onSubmit = async () => {
        console.log(localStorage.getItem('token'))
        const send = { name: subcategory, category_id: subcategory }
        try {
            setLoading(true);
            const {
                data: { id }
            } = await axios.post(`${process.env.REACT_APP_ECOMMERCE_FINAL}/subcategories`, send, {
                headers: { Authorization: `${localStorage.getItem('token')}` }
            });
            setLoading(false);
            console.log(id)
            // reset();
            // push(`/categories/${id}`);
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
            <Col>
                <Form onSubmit={onSubmit}>
                    <Row>{error && <Alert variant='danger'>{error}</Alert>}</Row>
                    <Row>
                        <Col>

                            <Form.Group className='mb-3' controlId='title'>
                                <Form.Label>Please insert SubCategory Name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Category name'
                                    onChange={(e) => setSubcategory(e.target.value)}
                                    value={subcategory}
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

export default SubCategories;