import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Admin = () => {
    return (<ul>
        <>
            <Link to='/admin/categories'><Button variant="info">Categories</Button></Link>
            <Link to='/admin/subcategories'><Button variant="warning">Subcategories</Button></Link>
            <Link to='/admin/products'><Button >Products</Button></Link>
        </>
    </ul>)
}

export default Admin