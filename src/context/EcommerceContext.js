import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const EcommerceContext = createContext();

const EcommerceState = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([])
    const [subcategories, setSubcategories] = useState([])
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoading(true);
                const {
                    data: { categories }
                } = await axios.get(`${process.env.REACT_APP_ECOMMERCE_FINAL}/categories`);
                setCategories(categories)
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
        getCategories()
    }, [])

    useEffect(() => {
        const getSubCategories = async () => {
            try {
                setLoading(true);
                const {
                    data: { subcategories }
                } = await axios.get(`${process.env.REACT_APP_ECOMMERCE_FINAL}/subcategories`);
                setSubcategories(subcategories)
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
        getSubCategories()
    }, [])

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const {
                    data: { products }
                } = await axios.get(`${process.env.REACT_APP_ECOMMERCE_FINAL}/products`);
                setProducts(products)
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
        getProducts()
    }, [])

    return (
        <EcommerceContext.Provider value={{ loading, categories, setCategories, subcategories, setSubcategories, products, setProducts }}>
            {children}
        </EcommerceContext.Provider>
    );
};

export default EcommerceState;
