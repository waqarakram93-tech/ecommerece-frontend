import { useContext } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Badge from 'react-bootstrap/Badge'
import moment from 'moment'
import { EcommerceContext } from '../context/EcommerceContext'
import { AuthContext } from '../context/AuthContext'


const Orders = () => {
    const { orders } = useContext(EcommerceContext)
    const { profile } = useContext(AuthContext)
    return (
        <>
            <div className="col-md-12">
                <div className="order mb-4 ">Your Orders</div>
                {
                    profile ? (<div className="table-responsive ">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center">Payment status</th>
                                    <th className="text-center">Order placed on</th>
                                    <th className="text-center">Dispatched to</th>
                                    <th className="text-center">Order Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    orders.map((item) => (<tr>
                                        <td className="text-center"><Badge bg='info'>In transit</Badge></td>
                                        <td className="text-center">{moment(item.order_date).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                        <td width="25% " className="text-center">{profile.address} {profile.postcode} {profile.city}</td>
                                        <td className="text-center">{item.order_total}</td>
                                    </tr>

                                    ))
                                }

                            </tbody>
                        </table>
                    </div>) : <Spinner animation='border' variant='primary' />
                }
            </div>
        </>
    )
}

export default Orders