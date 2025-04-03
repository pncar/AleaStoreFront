import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import api from "@/api/api.ts";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Swal from "sweetalert2";
const EditDiscount = () => {
    const { id } = useParams();

    const [discount,setDiscount] = useState<DiscountType|null>(null);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchDiscount = () => {
        api.get(`/discounts/${id}`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setDiscount(data);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    useEffect(()=>{
        fetchDiscount();
    },[]);

    const updateDiscount:SubmitHandler<FieldValues> = (data) => {
        const { name, rate } = data;
        api.patch(`/discounts/${id}`,{name,rate})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            Swal.fire({
                title: 'Discount Updated Successfully',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            navigate(`/dashboard/discounts`);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const deleteDiscount = () => {
        api.delete(`/discounts/${id}`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            Swal.fire({
                title: 'Discount Deleted Successfully',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            navigate(`/dashboard/discounts`);
        })
        .catch((error)=>{
            console.error;
        })
    }

    return(
        <div className="std-panel">
            <div>
                {discount ? 
                <div className="flex space-x-2">
                <form onSubmit={handleSubmit(updateDiscount)} className="flex space-x-2">
                    <div className="std-form-input">
                        <label>Name</label>
                        <input type="text" {...register("name")} defaultValue={discount.name}/>
                    </div>
                    <div className="std-form-input">
                    <label>Rate</label>
                        <input type="number" {...register("rate")} min={1} max={99} defaultValue={discount.rate}/>
                    </div>
                    <button type="submit" className="std-button bg-primary-950">Ok</button>
                </form>
                <button onClick={()=>{deleteDiscount()}} className="std-button bg-red-600">Delete</button>
                </div>:<></>
                }
            </div>
        </div>
    )
}
export default EditDiscount;