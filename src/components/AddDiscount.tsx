import axios from "axios";
import { useState, useEffect } from "react";
import { useForm }from "react-hook-form";
const AddDiscount = (props: {productId: number, onDiscountAdded: () => void}) => {

    const { productId, onDiscountAdded } = props;
    const [discounts,setDiscounts] = useState<any>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchDiscounts = () => {
        axios.get(`http://localhost:3000/discounts`,{withCredentials: true})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setDiscounts(data);
        })
        .catch((error)=>{
            console.log(`Error fetching discounts ->`,error);
        })
    }

    useEffect(()=>{
        fetchDiscounts();
    },[]);

    const add = (data:any) => {
        console.log(`INSERT INTO products_discounts (product_id,discount_id) VALUES(${productId}, ${data.discount});`)
        axios.post(`http://localhost:3000/products/set-product-discount`,{discountId: data.discount, productId},{withCredentials:true})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            console.log(data);
            onDiscountAdded();
        })
        .catch((error)=>{
            console.error(`Error linking Discount ${data.discount} to Product ${productId}. ->`,error);
        })
    }

    return(
        <div className="">
            {discounts.length > 0 ?
            <form onSubmit={handleSubmit(add)} className="flex items-center h-10 space-x-2">
                <select {...register("discount")} defaultValue={discounts[0].id} className="std-input h-full">
                    {discounts.map((discount:any)=>
                        <option key={discount.id} value={discount.id}>{discount.rate}% {discount.name}</option>
                    )}
                </select>
                <button type="submit" className="std-button bg-sky-600 h-full">Add</button>
            </form>:
            <div>There are no discounts yet.</div>
            }
        </div>
    )
}
export default AddDiscount;