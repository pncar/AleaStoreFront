import { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {

    const [orders,setOrders] = useState([]);

    const [viewDetails,setViewDetails] = useState<any>(null);

    const fetchOrders = () => {
        axios.get(`http://localhost:3000/orders`,{withCredentials:true})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setOrders(data);
        })
        .catch((error)=>{
            console.error(`Error fetching orders ->`,error);
        })
    }

    useEffect(()=>{
        fetchOrders();
    },[]);

    return(
        <div className="space-y-2">
            <div className="std-panel">
                <table className="std-table">
                    <thead>
                        <tr>
                            <th>Id</th><th>User</th><th>Status</th><th>Total</th><th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order:any)=>
                            <tr key={order.id}>
                                <td>
                                    {order.id}
                                </td>
                                <td>
                                    {order.user_name}
                                </td>
                                <td>
                                    {order.status}
                                </td>
                                <td>
                                    <span>${order.total}</span>
                                </td>
                                <td>
                                    <button onClick={()=>{setViewDetails(order.items)}} className="std-button bg-primary-600">View Details</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {viewDetails &&
            <div className="std-panel">
                <table className="std-table">
                    <thead>
                        <tr>
                            <td>Id</td><td>Quantity</td><td>Name</td><td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {viewDetails.map((orderItem:any)=>
                            <tr key={orderItem.id}>
                                <td>
                                    {orderItem.id}
                                </td>
                                <td>
                                    {orderItem.quantity}
                                </td>
                                <td>
                                    {orderItem.name}
                                </td>
                                <td>
                                    ${orderItem.price}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <button onClick={()=>{setViewDetails(null)}} className="std-button bg-red-600 text-xs">Close</button>
            </div>
            }
        </div>
    )
}
export default Orders;