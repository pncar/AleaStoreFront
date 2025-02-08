import Navbar from "../components/Navbar.tsx";
import { useState, useEffect } from "react";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import axios from "axios";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';

const Publish = () => {
    const { user } = useContext(GlobalContext);

    const [categories,setCategories] = useState<any>([]);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(()=>{
        axios.get(`http://localhost:3000/categories`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setCategories(data);
        })
        .catch((error)=>{
            console.error(`Error fetching categories ->`,error);
        })
    },[]);

    const submitPublish = (data:any) => {
        const {name,description,price,category,userId} = data;
        console.log(data);
        if(!name || !price || !category || !userId){
            Swal.fire({
                title: 'Error!',
                text: 'Some fields are missing',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return false;
        }
        axios.post(`http://localhost:3000/products/create`,{name,description,price,category,userId})
        .then((response)=>{
            console.log(response);
            return response;
        })
        .then((data)=>{
            console.log(data);
            Swal.fire({
                title: 'Product Added',
                text: 'Product was successfully published',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            navigate("/products");
        })
        .catch((error)=>{
            console.error(`Error publishing product -> `,error);
            Swal.fire({
                title: 'Error!',
                text: 'error.response.data.error',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        })
    }

    return(
        <div>
            <Navbar/>
            <div className="container w-full m-auto flex justify-center my-8">
                <div className="w-full md:w-2/3 bg-white rounded-md p-8 shadow-lg border border-primary-300">
                { user ? 
                    <>
                        <h3 className="font-bold my-2">Publish</h3>
                        <form onSubmit={handleSubmit(submitPublish)} className="flex flex-col space-y-2">
                            <input  {...register('userId')} type="hidden" value={user.id}/>
                            <input {...register('name')} type="text" placeholder={"Product Name"} className="p-2 px-3 rounded-md border border-primary-300"/>
                            <input {...register('price')} type="number" min={1} max={10000} defaultValue={1} className="text-right p-2 px-3 rounded-md border border-primary-300"/>
                            <select {...register('category')} className="p-2 px-3 rounded-md border border-primary-300">
                                {categories.map((category:any,key:number)=><option key={key} value={category.id}>{category.name}</option>)}
                            </select>
                            <textarea {...register('description')} placeholder={"Product Description"} className="p-2 px-3 rounded-md border border-primary-300"/>
                            <button type="submit" className="bg-primary-900 text-primary-50 p-2 px-3 rounded-md cursor-pointer">Publish</button>
                        </form>
                    </>
                    :
                    <>Not Logged In</>
                }
                </div>
            </div>
        </div>
    )
}
export default Publish;