import React from 'react'
import { useContext } from 'react'
import { EcommerceContext } from '../context/EcommerceContext'
import { AuthContext } from '../context/AuthContext'
import Button from 'react-bootstrap/Button'

export default function Checkout() {
    const { cart, checkCart, addToCart, decreaseFromCart, removeFromCart, checkOut } = useContext(EcommerceContext)
    const { profile } = useContext(AuthContext)
    var totalCartPrice = 0;
    return (
        <div>
            <div className="py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <div clasName="card">
                                <div className="card-header">
                                    <h4>Basic Information</h4>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>First Name </label>

                                                <input type="text" name="firstname" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>Last Name </label>

                                                <input type="text" name="lastname" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group mb-3">
                                                <label>Full Address </label>

                                                <textarea rows="3" className="form-control" ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>Postcode </label>

                                                <input type="text" name="postcode" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>City </label>

                                                <input type="text" name="city" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mb-3">
                                                <label>Phone </label>

                                                <input type="text" name="phone" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group text-end">
                                                <Button type='submit' className="btn btn-success">Save personal info</Button>
                                            </div>
                                        </div>
                                    </div>
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
                                                <td>{item.price * item.qty}</td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td colSpan="2 " className="text-end fw-bold">Total to Pay</td>
                                        <td colspan="2" className="text-end fw-bold">{totalCartPrice} EUR</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>

                    </div>
                    {profile.first_name && <Button onClick={checkOut} className="btn btn-primary">Place order and Pay</Button>}
                </div>
            </div>
        </div>
    )
}
