import Navbar from "../components/Navbar.tsx";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Cart = () => {

    const { user, cart } = useContext(GlobalContext);

    const [totalPrice,setTotalPrice] = useState(0); // FLAG - Probably reworked
    const [order,setOrder] = useState<any>();

    useEffect(()=>{
        let r = 0;
        cart?.map((item:any)=>{
            r += item.q * item.productType.price;
        });
        setTotalPrice(r);
    },[cart]);

    const finish = () => {
        const i = cart?.map((item)=>{
            return {id:item.productType.id,q:item.q}
        })
        
        const o = {
        name: "Order",
        total: totalPrice,
        list: i,
        user
        }
        console.log(o);
        setOrder(o);
    }

    return(
        <div>
            <Navbar/>
            <div className="container w-full m-auto flex justify-center my-8">
                <div className="w-full md:w-2/3 bg-white rounded-md p-8 shadow-lg border border-primary-300">
                    {user && cart?
                    <>
                        <div className="py-2">
                            <h3 className="font-semibold">{user.name}'s Cart</h3>
                        </div>
                        <table className="table-fixed w-full">
                            <thead className="bg-primary-200">
                                <tr className="border-b border-primary-300 font-semibold text-primary-500">
                                    <td className="p-4">
                                        Name
                                    </td>
                                    <td className="p-4 w-32 text-right">
                                        Quantity
                                    </td>
                                    <td className="p-4 w-32 text-right">
                                        Price
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                cart.map((cartItem:any,key:number)=>
                                    <tr key={key} className="border-b border-primary-200 odd:bg-primary-100">
                                        <td className="p-4">{cartItem.productType.name}</td>
                                        <td className="p-4 w-32 text-right">{cartItem.q}</td>
                                        <td className="p-4 w-32 text-right">${cartItem.q * cartItem.productType.price}</td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                        <div className="my-2 p-4 border border-primary-300 shadow-md rounded-md flex space-x-2 items-center">
                            <div className="font-semibold text-lg px-3">Total: ${totalPrice}</div>
                            <button onClick={finish} className="std-button bg-green-600">Finish</button>
                            <button className="std-button bg-red-600">Clean Cart</button>
                        </div>
                        <div>
                            {order && JSON.stringify(order)}
                        </div>
                    </>
                    :
                    <>
                    </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart;