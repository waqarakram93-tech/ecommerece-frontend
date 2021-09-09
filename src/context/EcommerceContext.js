import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext'

export const EcommerceContext = createContext();

const EcommerceState = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([])
    const [subcategories, setSubcategories] = useState([])
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

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

    useEffect(() => {
        const getOrdersByUser = async () => {
            try {
                setLoading(true);
                const {
                    data: orders
                } = await axios.get(`${process.env.REACT_APP_ECOMMERCE_FINAL}/orders/user`, {
                    headers: { Authorization: `${localStorage.getItem('token')}` }
                });
                setOrders(orders)
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
        isAuthenticated && getOrdersByUser()
    }, [isAuthenticated])

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

    const addImageToProduct = async (id, formData) => {
        try {
            setLoading(true);
            const { data } = await axios.put(`${process.env.REACT_APP_ECOMMERCE_FINAL}/products/${id}/image`, formData, {
                headers: { Authorization: `${localStorage.getItem('token')}` }
            });
            setProducts(prev => prev.map(p => {
                if (p.id === id) {
                    return { ...p, images: [...p.images, data] }
                } else {
                    return p
                }
            }))
            setSuccess('Image added to product')
            setTimeout(() => setSuccess(null), 3000);
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

    const checkCart = newProduct => {
        const productExists = cart.find(item => item.id === newProduct.id)
        return productExists ? true : false
    }

    const addToCart = (product) => {
        const found = checkCart(product)
        if (!found) {
            setCart(prev => {
                const newCart = [{ ...product, qty: 1 }, ...prev]
                localStorage.setItem('cart', JSON.stringify(newCart))
                return newCart
            })
        } else {
            setCart(prev => {
                const newCart = prev.map(item => {
                    if (item.id === product.id) {
                        return { ...item, qty: item.qty + 1 }
                    } else {
                        return item
                    }
                })
                localStorage.setItem('cart', JSON.stringify(newCart))
                return newCart
            })
        }
    }

    const decreaseFromCart = product => {
        const found = checkCart(product);
        if (!found) return;
        setCart(prev => {
            const newCart = prev
                .map(item => {
                    if (item.id === product.id) {
                        return { ...item, qty: item.qty - 1 };
                    } else {
                        return item;
                    }
                })
                .filter(item => item.qty > 0);
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        });
    };

    const removeFromCart = (product) => {
        const found = checkCart(product)
        if (!found) return
        setCart(prev => {
            const newCart = prev.filter(item => {
                if (item.id !== product.id) {
                    return item
                }
            })
            localStorage.setItem('cart', JSON.stringify(newCart))
            return newCart
        })
    }

    const checkOut = async () => {
        const order_total = cart.reduce((ac, c) => ac + c.price * c.qty, 0)
        try {
            setLoading(true);
            const {
                data: order
            } = await axios.post(`${process.env.REACT_APP_ECOMMERCE_FINAL}/orders`, { order_total }, {
                headers: { Authorization: `${localStorage.getItem('token')}` }
            });
            const {
                data: orderdetails
            } = await axios.post(`${process.env.REACT_APP_ECOMMERCE_FINAL}/orderdetails`, { order, cart }, {
                headers: { Authorization: `${localStorage.getItem('token')}` }
            });
            localStorage.removeItem('cart')
            setCart([])
            const {
                data: { url }
            } = await axios.post(`${process.env.REACT_APP_ECOMMERCE_FINAL}/checkout`, { cart }, {
                headers: { Authorization: `${localStorage.getItem('token')}` }
            });
            setLoading(false);
            window.location.href = url;
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
        <EcommerceContext.Provider value={{ loading, success, error, categories, setCategories, subcategories, setSubcategories, products, setProducts, createCategory, deleteCategory, createSubcategory, deleteSubcategory, createProduct, deleteProduct, addImageToProduct, cart, checkCart, addToCart, decreaseFromCart, removeFromCart, checkOut, orders }}>
            {children}
        </EcommerceContext.Provider>
    );
};

export default EcommerceState;
