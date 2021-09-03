import { useState, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import DataTable from 'react-data-table-component';
import { EcommerceContext } from '../context/EcommerceContext'


const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;


const Products = () => {
    const { error, success, products, subcategories, createProduct, deleteProduct, addImageToProduct } = useContext(EcommerceContext)
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null)
    const [formState, setFormState] = useState({
        subcat_id: '',
        product_name: '',
        product_description: '',
        price: '',
        stock: ''
    });
    const [file, setFile] = useState('')
    const { subcat_id, product_name, product_description, price, stock } = formState

    const handleOpen = (id) => {
        setShow(true)
        setCurrentProduct(id)
    }

    const handleClose = () => {
        setShow(false)
        setCurrentProduct(null)
    }

    const onChange = (e) => setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const onSubmit = async (e) => {
        e.preventDefault()
        await createProduct(formState)
        setFormState({
            subcat_id: '',
            product_name: '',
            product_description: '',
            price: '',
            stock: ''
        })
    };

    const onSubmitImage = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('image', file[0]);
        await addImageToProduct(currentProduct, formData)
        handleClose()
    }

    const columns = [
        {
            name: 'Product ID',
            selector: ({ id }) => <Link to={`/product/${id}`}>{id}</Link>
        },
        {
            name: 'Name',
            selector: ({ id, name }) => <Link to={`/product/${id}`}>{name}</Link>,
        },
        {
            name: 'Category',
            selector: ({ category }) => category
        },
        { name: 'Subcategory', selector: ({ subcategory }) => subcategory },
        {
            name: 'Actions',
            selector: ({ id }) => <div><Button variant='warning' onClick={() => handleOpen(id)}>Add image</Button><Button variant='danger' onClick={() => deleteProduct(id)}>Delete</Button></div>,
        },
    ];

    if (loading) return <Spinner animation='border' variant='primary' />;
    return (
        <Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Adding image to product {currentProduct}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={onSubmitImage}>
                    <Modal.Body>
                        <Form.Group className='mb-3' controlId='product_name'>
                            <Form.Label>Select image</Form.Label>
                            <Form.Control
                                type='file'
                                onChange={(e) => setFile(e.target.files)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit'>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            <Col>
                <Form onSubmit={onSubmit}>
                    <Row>{error && <Alert variant='danger'>{error}</Alert>}</Row>
                    <Row>{success && <Alert variant='success'>{success}</Alert>}</Row>
                    <Row>
                        <Col md={4}>
                            <Form.Group className='mb-3' controlId='product_name'>
                                <Form.Label>Product name</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='product_name'
                                    placeholder='Product name'
                                    onChange={onChange}
                                    value={product_name}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group className='mb-3' controlId='subcat_id'>
                                <Form.Label>Subcategory</Form.Label>
                                <Form.Select aria-label="Default select example" name='subcat_id' value={subcat_id} onChange={onChange}>
                                    <option>Select subcategory...</option>
                                    {
                                        subcategories.map(subcat => <option key={subcat.id} value={subcat.id}>{subcat.name}</option>)
                                    }
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group className='mb-3' controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type='number'
                                    step=".01"
                                    name='price'
                                    placeholder='Price'
                                    onChange={onChange}
                                    value={price}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group className='mb-3' controlId='stock'>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type='number'
                                    step="number"
                                    name='stock'
                                    placeholder='Stock'
                                    onChange={onChange}
                                    value={stock}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className='mb-3' controlId='product_description'>
                                <Form.Label>Product description</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    name='product_description'
                                    style={{ height: '100px' }}
                                    placeholder='Product description'
                                    onChange={onChange}
                                    value={product_description}
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
                title='Products'
                paginationPerPage={5}
                columns={columns}
                data={products}
                pagination
                expandableRows
                expandableRowsComponent={ExpandedComponent}
                expandOnRowClicked={false}
                expandOnRowDoubleClicked={false}
                expandableRowsHideExpander={false}
            />
        </Row >
    );
};

export default Products;


