import Order from "../components/Order.tsx";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import Swal from 'sweetalert2';

const Cart = () => {

    const { user, cart, totalPrice, totalPriceDiscounted, userOrders, clearCart, modifyItemInCart, fetchOrders, updateOrderStatus } = useContext(GlobalContext);

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

        axios.post(`http://localhost:3000/orders/create`,{userId:o.user.id,total:o.total,list:o.list}, { withCredentials: true })
        .then((response)=>{
            return response.data
        })
        .then((data)=>{
            console.log(data);
            console.log(fetchOrders());
            clearCart();
        })
        .catch((error)=>{
            console.log(`Error creating order ->`,error);
            Swal.fire({
                title: 'Error',
                text: error.response.data || "Unhandled error",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        })
    }


    return(
        <div>
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
                                        Product
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
                                        <td className="p-4">
                                            <div className="flex space-x-2">
                                                <img className="w-8" src={cartItem.productType.image ? `http://localhost:3000/uploads/${cartItem.productType.image}` : `https://www.svgrepo.com/show/508699/landscape-placeholder.svg`}/> 
                                                <span>{cartItem.productType.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 w-32 text-right flex">
                                            <div onClick={()=>{modifyItemInCart(cartItem.productType.id,"decrease")}} className="w-full text-center bg-primary-500 rounded-l text-primary-50 cursor-pointer flex items-center justify-center font-semibold transition-all hover:bg-primary-400">-</div>
                                            <div onClick={()=>{modifyItemInCart(cartItem.productType.id,"increase")}} className="w-full text-center bg-primary-500 rounded-r text-primary-50 cursor-pointer flex items-center justify-center font-semibold transition-all hover:bg-primary-400">+</div>
                                            <div className="w-full">{cartItem.q}</div>
                                        </td>
                                        {Number(cartItem.productType.price) === Number(cartItem.productType.discounted_price) ?
                                        <td className="p-4 w-32 text-right">${cartItem.q * cartItem.productType.discounted_price}</td>:
                                        <td className="p-4 w-32 text-right"><span className="line-through text-primary-600 font-light">${cartItem.q * cartItem.productType.price}</span> ${cartItem.q * cartItem.productType.discounted_price}</td>
                                        }
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                        <div className="my-2 p-4 border border-primary-300 shadow-md rounded-md flex space-x-2 items-center">
                            {totalPrice === totalPriceDiscounted ? 
                            <div className="font-semibold text-lg px-3">Total: ${totalPrice}</div>:
                            <div className="font-semibold text-lg px-3">Total: <span className="line-through font-light text-primary-600">${totalPrice}</span> ${totalPriceDiscounted}</div>
                            }
                            <button onClick={finish} className="std-button bg-green-600">Finish</button>
                            <button onClick={clearCart} className="std-button bg-red-600">Clean Cart</button>
                        </div>
                        <div>
                            <h3 className="font-semibold my-3">User Orders</h3>
                            <div className="space-y-2">
                                {userOrders && userOrders.map((order:any)=>
                                    <Order key={order.id} order={order}/>
                                )}
                            </div>
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