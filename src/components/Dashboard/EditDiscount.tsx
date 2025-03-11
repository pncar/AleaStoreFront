import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
const EditDiscount = () => {
    const { id } = useParams();

    const [discount,setDiscount] = useState<any>(null);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchDiscount = () => {
        axios.get(`http://localhost:3000/discounts/${id}`,{withCredentials:true})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setDiscount(data[0]);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    useEffect(()=>{
        fetchDiscount();
    },[]);

    const updateDiscount = (data:any) => {
        const { name, rate } = data;
        axios.post(`http://localhost:3000/discounts/update/${id}`,{name,rate},{withCredentials:true})
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

    return(
        <div className="std-panel">
            <div>
                {discount ? 
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
                </form>:<></>
                }
            </div>
        </div>
    )
}
export default EditDiscount;