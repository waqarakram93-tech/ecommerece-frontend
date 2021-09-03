import { useContext } from 'react'
import { EcommerceContext } from '../context/EcommerceContext'

const Cart = () => {
    const { cart, checkCart, addToCart, decreaseFromCart, removeFromCart } = useContext(EcommerceContext)
    return <div>{
        cart.map(item => (
            <div>
                | a minuture pic | {item.name} | decrease button |{item.qty} | increase button| {item.subcategory} | {item.price} | {item.price * item.qty}
            </div>
        ))
    }

        Total amount
        Go to checkout button
    </div>
}

export default Cart