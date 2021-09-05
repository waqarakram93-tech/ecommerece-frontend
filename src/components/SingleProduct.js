import { useContext } from 'react';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import { EcommerceContext } from '../context/EcommerceContext'

const SingleProduct = () => {
    const { checkCart, addToCart, removeFromCart } = useContext(EcommerceContext)
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState()
    const [error, setError] = useState(null)

    useEffect(() => {
        const getSingleProduct = async () => {
            try {
                setLoading(true);
                const {
                    data
                } = await axios.get(`${process.env.REACT_APP_ECOMMERCE_FINAL}/products/${id}`);
                setProduct(data)
                setLoading(false);
            } catch (error) {
                if (error.response) {
                    setError(error.response.data.error);
                    setTimeout(() => setError(null), 3000);
                    setLoading(false);
                } else {
                    setError(error.message);
                    setTimeout(() => setError(null), 3000);
                    setLoading(false);
                }
            }
        }
        !error && getSingleProduct()
    }, [id, error])

    if (error) return <div>{error.message}</div>
    return !loading && product ?
        (<div>
            <div className="py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 border-end">
                            <Carousel style={{ height: '20rem' }}>
                                {
                                    product.images.map(img => (<Carousel.Item interval={1500} key={img.id}>
                                        <Card.Img variant="top" src={img.url} />
                                    </Carousel.Item>))
                                }
                            </Carousel>


                        </div>
                        <div className="col-md-8">
                            <h4 className="name">{product.name}</h4>
                            <div className="mt-4">
                                <p><h6 className="des">Product Description:</h6></p>
                                <p >{product.description}</p>
                            </div>
                            <h4 className="mb-1">
                                Price: {product.price} EUR
                            </h4>
                            <div>
                                <label className="btn-sm btn-danger px-4 mt-3">Only  {product.stock}  left</label>
                            </div>
                            <div className="mt-4">
                                {
                                    checkCart(product) ?
                                        <Button variant="danger " onClick={() => removeFromCart(product)}>Remove from cart</Button> :
                                        <Button variant="primary w-25" onClick={() => addToCart(product)}>Add to Cart</Button>
                                }
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>)
        : <div>Loading</div>










}


export default SingleProduct