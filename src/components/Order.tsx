import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.tsx";
const Order = (props: { order: any}) => {
    const { order } = props;

    const { updateOrderStatus } = useContext(GlobalContext);

    return(
        <div className="bg-primary-50 rounded-md shadow-md border border-sky-300">
            <div className="font-semibold text-xs p-2 text-primary-600 bg-sky-100 flex items-center">
                <div className="w-full">Order {order.id} - {order.status}</div>
                <div className="text-right space-x-2 flex">
                    <button onClick={()=>{updateOrderStatus(order.id,"paid")}} className="std-button bg-sky-600">Pay</button>
                    <button onClick={()=>{updateOrderStatus(order.id,"cancelled")}} className="std-button bg-red-600">Cancel</button>
                </div>
            </div>
            {order.items.length > 0 ?
            <>
            <table className="table-fixed w-full text-xs border-collapse border-y border-sky-300 shadow-md rounded-md">
                <thead className="bg-sky-50 font-semibold">
                    <tr>
                        <td className="p-2">Item</td>
                        <td className="p-2 text-right">Quantity</td>
                        <td className="p-2 text-right">Price</td>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map((item:any)=>
                        <tr key={item.id} className="border-b border-primary-200 last:border-0">
                            <td className="p-2">{item.name}</td>
                            <td className="p-2 text-right">{item.quantity}</td>
                            {Number(item.price) === Number(item.price_raw) ? 
                            <td className="p-2 text-right">${item.price}</td> : 
                            <td className="p-2 text-right"><span className="line-through text-primary-600 font-light">${item.price}</span> ${item.price_raw}</td>
                            } 
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="text-sky-800 bg-sky-100 flex p-3 font-semibold text-sm">
                <div className="w-full">
                    Total
                </div>
                <div className="w-24 text-right">
                    ${order.total}
                </div>
            </div>
            </>
            :
            <div className="p-3">Order has no Items</div>
            }
        </div>
    )
}
export default Order;