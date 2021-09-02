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

    const createCategory = async (params) => {
        try {
            setLoading(true);
            const {
                data
            } = await axios.post(`${process.env.REACT_APP_ECOMMERCE_FINAL}/categories`, params, {
                headers: { Authorization: `${localStorage.getItem('token')}` }
            });
            setCategories(prev => [...prev, data])
            setLoading(false);
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
    }

    const deleteCategory = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${process.env.REACT_APP_ECOMMERCE_FINAL}/categories/${id}`, {
                headers: { Authorization: `${localStorage.getItem('token')}` }
            });
            setCategories(prev => prev.filter(c => c.id !== id))
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
    };

    const createSubcategory = async (formState) => {
        try {
            setLoading(true);
            const {
                data
            } = await axios.post(`${process.env.REACT_APP_ECOMMERCE_FINAL}/subcategories`, formState, {
                headers: { Authorization: `${localStorage.getItem('token')}` }
            });
            setSubcategories(prev => [...prev, data])
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
    };

    const deleteSubcategory = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${process.env.REACT_APP_ECOMMERCE_FINAL}/subcategories/${id}`, {
                headers: { Authorization: `${localStorage.getItem('token')}` }
            });
            setSubcategories(prev => prev.filter(s => s.id !== id))
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
    };

    const createProduct = async (formState) => {
        try {
            setLoading(true);
            const {
                data
            } = await axios.post(`${process.env.REACT_APP_ECOMMERCE_FINAL}/products`, formState, {
                headers: { Authorization: `${localStorage.getItem('token')}` }
            });
            setProducts(prev => [...prev, data])
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
    };

    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${process.env.REACT_APP_ECOMMERCE_FINAL}/products/${id}`, {
                headers: { Authorization: `${localStorage.getItem('token')}` }
            });
            setProducts(prev => prev.filter(p => p.id !== id))
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
    };

    return (
        <EcommerceContext.Provider value={{ loading, error, categories, setCategories, subcategories, setSubcategories, products, setProducts, createCategory, deleteCategory, createSubcategory, deleteSubcategory, createProduct, deleteProduct }}>
            {children}
        </EcommerceContext.Provider>
    );
};

export default EcommerceState;
