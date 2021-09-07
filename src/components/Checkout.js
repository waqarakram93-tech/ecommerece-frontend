import React from 'react'
import { useContext, useEffect } from 'react'
import { EcommerceContext } from '../context/EcommerceContext'
import { AuthContext } from '../context/AuthContext'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useForm } from 'react-hook-form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner'
import { Redirect, useLocation } from 'react-router-dom';

const Checkout = () => {
    //const location = useLocation();
    const { cart, checkCart, checkOut } = useContext(EcommerceContext)
    const { profile, error, loading, isAuthenticated, updateUserInfo, updated } = useContext(AuthContext)

    var totalCartPrice = 0;
    const defaultValues = {
        firstname: '',
        lastname: '',
        address: '',
        postcode: '',
        city: '',
        phone: '',

    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm({ defaultValues });

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ defaultValues });
        }
    }, [isSubmitSuccessful, reset]);

    const onSubmit = async data => await updateUserInfo(data);
    if (isAuthenticated)
        return (


            <div>
                <div className="py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7">
                                <div clasName="card">
                                    <div className="card-header">
                                        <h4>Delivery Information</h4>
                                    </div>
                                    <div className="py-4">
                                        <Col >
                                            <Row>
                                                <Form onSubmit={handleSubmit(onSubmit)}>
                                                    <Row>{error && <Alert variant='danger'>{error}</Alert>}</Row>
                                                    <Row>

                                                        <Col md={6}>
                                                            <Form.Group className='mb-3' controlId='firstname'>
                                                                <Form.Label>First Name</Form.Label>
                                                                <Form.Control
                                                                    type='firstname'
                                                                    placeholder='First Name'
                                                                    {...register('firstname', { required: 'First Name is required' })}
                                                                />
                                                                {errors.firstname && <Alert variant='danger'>{errors.firstname.message}</Alert>}
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className='mb-3' controlId='lastname'>
                                                                <Form.Label>Last Name</Form.Label>
                                                                <Form.Control
                                                                    type='lastname'
                                                                    placeholder='Last Name'
                                                                    {...register('lastname', { required: 'Last Name is required' })}
                                                                />
                                                                {errors.lastname && <Alert variant='danger'>{errors.lastname.message}</Alert>}
                                                            </Form.Group>
                                                        </Col>
                                                        <Form.Group className='mb-3' controlId='address'>
                                                            <Form.Label>Full Address</Form.Label>
                                                            <Form.Control
                                                                type='address'
                                                                placeholder='Address'
                                                                {...register('address', { required: 'Address is required' })}
                                                            />
                                                            {errors.address && <Alert variant='danger'>{errors.address.message}</Alert>}
                                                        </Form.Group>

                                                        <Col md={6}>
                                                            <Form.Group className='mb-3' controlId='postcode'>
                                                                <Form.Label>Postcode</Form.Label>
                                                                <Form.Control
                                                                    type='postcode'
                                                                    placeholder='Postcode'
                                                                    {...register('postcode', { required: 'Postcode is required' })}
                                                                />
                                                                {errors.postcode && <Alert variant='danger'>{errors.postcode.message}</Alert>}
                                                            </Form.Group>
                                                        </Col>

                                                        <Col md={6}>
                                                            <Form.Group className='mb-3' controlId='city'>
                                                                <Form.Label>City</Form.Label>
                                                                <Form.Control
                                                                    type='city'
                                                                    placeholder='City'
                                                                    {...register('city', { required: 'City is required' })}
                                                                />
                                                                {errors.city && <Alert variant='danger'>{errors.city.message}</Alert>}
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className='mb-3' controlId='phone'>
                                                                <Form.Label>Phone</Form.Label>
                                                                <Form.Control
                                                                    type='phone'
                                                                    placeholder='Phone'
                                                                    {...register('phone', { required: 'Phone is required' })}
                                                                />
                                                                {errors.phone && <Alert variant='danger'>{errors.phone.message}</Alert>}
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6} >
                                                            <Button variant='primary' type='submit'>
                                                                Save Delivery Info
                                                            </Button> </Col>
                                                        <Col className="text-end" md={6}>
                                                            {updated && <Button onClick={checkOut} className="btn btn-primary" >Place order and Pay</Button>}
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </Row>
                                        </Col>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-5">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th width="50%">Product</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item) => {
                                            totalCartPrice += item.price * item.qty;
                                            return (
                                                <tr>
                                                    <td>{item.name}</td>
                                                    <td>{item.price}</td>
                                                    <td>{item.qty}</td>
                                                    <td>{(item.price * item.qty).toFixed(2)}</td>
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <td colSpan="2 " className="text-end fw-bold">Total to Pay</td>
                                            <td colspan="2" className="text-end fw-bold">{totalCartPrice.toFixed(2)} EURO</td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>

                        </div>

                    </div>
                </div>
            </div >
        )
}
export default Checkout
