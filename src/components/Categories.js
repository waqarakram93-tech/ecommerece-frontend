import { useState, useContext } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import DataTable from 'react-data-table-component';
import { EcommerceContext } from '../context/EcommerceContext'


const Categories = () => {
    const { error, categories, setCategories, createCategory, deleteCategory } = useContext(EcommerceContext)
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault()
        const send = { name: category }
        await createCategory(send)
        setCategory('')
    }

    const columns = [
        {
            name: 'Category ID',
            selector: ({ id }) => id
        },
        {
            name: 'Name',
            selector: ({ name }) => name,
        },
        {
            name: 'Actions',
            selector: ({ id }) => <div><Button variant='warning'>Edit</Button><Button variant='danger' onClick={() => deleteCategory(id)}>Delete</Button></div>,
        },
    ];


    if (loading) return <Spinner animation='border' variant='primary' />;
    return (
        <Row>
            <Col>
                <Form onSubmit={onSubmit}>
                    <Row>{error && <Alert variant='danger'>{error}</Alert>}</Row>
                    <Row>
                        <Col>
                            <Form.Group className='mb-3' controlId='title'>
                                <Form.Label>Category name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Category name'
                                    onChange={(e) => setCategory(e.target.value)}
                                    value={category}
                                />

                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </Col>
            <DataTable
                title='Categories'
                columns={columns}
                data={categories}
                pagination
            />
        </Row >
    );
};

export default Categories;


