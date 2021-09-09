const Orders = () => {
    return (
        <div className="col-md-12">
            <div className="order mb-4 ">Your Orders</div>
            <div className="table-responsive ">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center">Order Placed</th>
                            <th className="text-center">Dispatched To</th>
                            <th className="text-center">Product Name</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Total Price</th>
                            <th className="text-center">Order Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-center">abc</td>
                            <td width="25% " className="text-center">abc</td>

                            <td width="25%" className="text-center">abc</td>
                            <td width="10% " className="text-center">abc</td>
                            <td width="10%" className="text-center">abc</td>
                            <td className="text-center">abc</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Orders