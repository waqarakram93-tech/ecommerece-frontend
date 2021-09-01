import { Link } from 'react-router-dom'

const Admin = () => {
    return (<ul>
        <li><Link to='/admin/categories'>Categories</Link></li>
        <li><Link to='/admin/subcategories'>Subcategories</Link></li>
        <li><Link to='/admin/products'>Products</Link></li>
    </ul>)
}

export default Admin