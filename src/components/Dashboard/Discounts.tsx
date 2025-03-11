import { useState, useEffect } from "react";
import axios from "axios";
import CreateDiscount from "../../components/CreateDiscount.tsx";
import { Link } from "react-router";
const Discounts = () => {

    const [discounts,setDiscounts] = useState([]);

    useEffect(()=>{
        fetchDiscounts();
    },[]);

    const fetchDiscounts = () => {
        axios.get(`http://localhost:3000/discounts`,{withCredentials:true})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setDiscounts(data);
        })
        .catch((error)=>{
            console.error(`Error fetching discounts ->`,error);
        })
    }


    return (
        <div className="space-y-2">
            <CreateDiscount onDiscountCreated={()=>{fetchDiscounts()}}/>
            <div className="std-panel">
                <table className="std-table">
                    <thead>
                        <tr>
                            <th>Id</th><th>Name</th><th>Type</th><th>Rate</th><th>Commands</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discounts.map((discount:any)=>
                        <tr key={discount.id} className="">
                            <td>
                                {discount.id}
                            </td>
                            <td>
                                {discount.name}
                            </td>
                            <td>
                                {discount.type}
                            </td>
                            <td>
                                {discount.rate}%
                            </td>
                            <td>
                                <Link to={`/dashboard/discounts/edit/${discount.id}`} className="std-button bg-sky-600">Edit</Link>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Discounts;