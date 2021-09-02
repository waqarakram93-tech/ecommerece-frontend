import { useState, Fragment, useContext } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import DataTable from 'react-data-table-component';
import { EcommerceContext } from '../context/EcommerceContext'


const SubCategories = () => {
    const { error, categories, subcategories, createSubcategory, deleteSubcategory } = useContext(EcommerceContext)
    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState({
        name: '',
        category_id: ''
    });
    const { name, category_id } = formState

    const onChange = (e) => setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const onSubmit = async (e) => {
        e.preventDefault()
        await createSubcategory(formState)
        setFormState({
            name: '',
            category_id: ''
        })
    };

    const columns = [
        {
            name: 'Subcategory ID',
            selector: ({ id }) => id
        },
        {
            name: 'Name',
            selector: ({ name }) => name,
        },
        {
            name: 'Actions',
            selector: ({ id }) => <div><Button variant='warning'>Edit</Button><Button variant='danger' onClick={() => deleteSubcategory(id)}>Delete</Button></div>,
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
                            <Form.Group className='mb-3' controlId='name'>
                                <Form.Label>Subcategory name</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='name'
                                    placeholder='Category name'
                                    onChange={onChange}
                                    value={name}
                                />

                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className='mb-3' controlId='category_id'>
                                <Form.Label>Category</Form.Label>
                                <Form.Select aria-label="Default select example" name='category_id' value={category_id} onChange={onChange}>
                                    <option>Select category...</option>
                                    {
                                        categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </Col>
            <DataTable
                title='Subcategories'
                columns={columns}
                data={subcategories}
                pagination
            />
        </Row >
    );
};

export default SubCategories;


