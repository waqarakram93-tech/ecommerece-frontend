import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SingleProduct = () => {
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
    return !loading && product ? (<div>{product.name}</div>) : <div>Loading</div>
}

export default SingleProduct