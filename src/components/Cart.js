import { useContext } from 'react'
import { EcommerceContext } from '../context/EcommerceContext'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'


const Cart = () => {
    const { cart, checkCart, addToCart, decreaseFromCart, removeFromCart } = useContext(EcommerceContext)
    var totalCartPrice = 0;

    const renderCart = () => {
        if (cart.length > 0) {
            return (
                <>
                    <div className="col-md-12">
                        <div className="table-responsive ">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Product Image</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item) => {
                                        totalCartPrice += item.price * item.qty;
                                        return (
                                            <tr>

                                                <Carousel style={{ width: '20rem', height: '20rem' }}>
                                                    {
                                                        item.images.map(img => (<Carousel.Item interval={1500} key={img.id}>
                                                            <Card.Img variant="top" src={img.url} />
                                                        </Carousel.Item>))
                                                    }
                                                </Carousel>

                                                <td>{item.name}</td>
                                                <td width="15% " className="text-center">{item.price}</td>

                                                <td width="15%">
                                                    <div className="input-group">
                                                        <button type="button" className="input-group-text" onClick={() => decreaseFromCart(item)}>-</button>
                                                        <div className="form-control text-center">{item.qty}</div>

                                                        <button type="button" className="input-group-text" onClick={() => addToCart(item)}>+</button>
                                                    </div>
                                                </td>
                                                <td width="15% " className="text-center">{(item.price * item.qty).toFixed(2)}</td>
                                                <td width="10%">
                                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => removeFromCart(item)}>Remove</button>
                                                </td>

                                            </tr>

                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-8"></div>
                    <div className="col-md-4">
                        <div className=" card card-body mt-3 ">
                            <div className="total">
                                <h5 >Sub Total:
                                    <span className="float-end">{totalCartPrice.toFixed(2)} EURO</span>
                                </h5>
                            </div>
                            <div className="mt-2">
                                <p>Free Delivery</p>
                            </div>
                            <div className="mt-3">
                                <Button variant="primary w-100" as={Link} to='/checkout'>Checkout</Button>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (<div className="card card-body py-5 text-center shadow-sm">
                <h3 > Your cart is empty</h3>
            </div>)
        }
    }


    return (
        <div className="py-4">
            <div className="container">
                <div className="row">
                    {renderCart()}
                </div>
            </div>
        </div>




    )
}

export default Cart
//| a minuture pic | {item.name} | decrease button |{item.qty} | increase button| {item.subcategory} | {item.price} | {item.price * item.qty}
// Total amount
//         Go to checkout button