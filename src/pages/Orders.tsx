import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.tsx";
import Order from "../components/Order.tsx";
const Orders = () => {

    const { userOrders } = useContext(GlobalContext);

    return(
        <div>
            <div className="container w-full m-auto flex justify-center my-8">
                <div className="w-full md:w-2/3 bg-white rounded-md p-8 shadow-lg border border-primary-300">
                    Orders
                    <div>
                        {userOrders && userOrders.length > 0 ? 
                        <div className="space-y-2">
                        {userOrders.map((order)=>
                            <Order key={order.id} order={order}/>
                        )}
                        </div>:
                        <>No Orders</>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Orders;