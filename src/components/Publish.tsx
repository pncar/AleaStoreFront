import { useState, useEffect } from "react";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import api from "@/api/api.ts";
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';
import { faker } from "@faker-js/faker";
import _ from "lodash";

const Publish = (props: {onHandlePublish?: () => void}) => {
    const { onHandlePublish } = props;
    const { user } = useContext(GlobalContext);

    const [categories,setCategories] = useState<CategoryType[]>([]);
    const [image,setImage] = useState<File | null>(null);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(()=>{
        api.get(`/categories`)
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

    const submitPublish:SubmitHandler<FieldValues> = (data) => {
        const {name,description,price,category,userId} = data;
        console.log(data);
        const formData = new FormData();
        formData.append("name",name);
        formData.append("description",description);
        formData.append("price",price);
        formData.append("category",category);
        formData.append("userId",userId);
        if(image){
            console.log(image);
            formData.append("image",image);
        }

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        console.log(image);

        if(!name || !price || !category || !userId){
            Swal.fire({
                title: 'Error!',
                text: 'Some fields are missing',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return false;
        }
        api.post(`/products`,formData)
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
            if(onHandlePublish){
                onHandlePublish();
            }else{
                navigate("/products");
            }
        })
        .catch((error)=>{
            console.error(`Error publishing product -> `,error);
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        })
    }

    return(
        <div>
            <div>
                <div className="w-full bg-white rounded-md p-8 shadow-lg border border-primary-300">
                { user?.role === "admin" ? 
                    <>
                        <h3 className="font-bold my-2">Publish</h3>
                        <form onSubmit={handleSubmit(submitPublish)} encType="multipart/form-data" className="flex flex-col space-y-2">
                            <input  {...register('userId')} type="hidden" value={user.id}/>
                            <input defaultValue={_.capitalize(faker.lorem.word())} {...register('name',{required: "Product Name is required"})} type="text" placeholder={"Product Name"} className="p-2 px-3 rounded-md border border-primary-300"/>
                            <input defaultValue={faker.number.int(100)*100} {...register('price',{required: "Price is required"})} type="number" min={1} max={10000} className="text-right p-2 px-3 rounded-md border border-primary-300"/>
                            <select {...register('category',{required: "Category is required"})} defaultValue={1} className="p-2 px-3 rounded-md border border-primary-300">
                                {categories.map((category:CategoryType,key:number)=><option key={key} value={category.id}>{category.name}</option>)}
                            </select>
                            {image && 
                                <div className="relative group">
                                    <div className="absolute w-full h-full bg-primary-500 opacity-0 group-hover:opacity-30">
                                    </div>
                                    <button onClick={()=>{setImage(null)}} className="absolute z-10 w-8 h-8 bg-primary-500 rounded-full top-2 right-2 opacity-0 group-hover:opacity-100 text-primary-50 cursor-pointer">X</button>
                                    <img src={URL.createObjectURL(image)} className="w-full"/>
                                </div>}
                            <input {...register("file")} accept={".jpg, .jpeg, .webp, .png"} onChange={(e) => {setImage(e.target.files?.[0] || null)}} type="file" className="p-2 px-3 rounded-md border border-primary-300"/>
                            <textarea {...register('description')} placeholder={"Product Description"} className="p-2 px-3 rounded-md border border-primary-300"/>
                            <button autoFocus type="submit" className="bg-primary-900 text-primary-50 p-2 px-3 rounded-md cursor-pointer">Publish</button>
                        </form>
                    </>
                    :
                    <>Access Denied</>
                }
                </div>
            </div>
        </div>
    )
}
export default Publish;