import api from "@/api/api.ts";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler, FieldValues }from "react-hook-form";
const AddCategory = (props: {productId: number, onCategoryAdded: () => void}) => {

    const { productId, onCategoryAdded } = props;
    const [categories,setCategories] = useState<CategoryType[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchCategories = () => {
        api.get(`/categories`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setCategories(data);
        })
        .catch((error)=>{
            console.log(`Error fetching categories ->`,error);
        })
    }

    useEffect(()=>{
        fetchCategories();
    },[]);

    const add:SubmitHandler<FieldValues> = (data) => {
        console.log(`trying to set category ${data.category} on product ${productId}`);
        api.post(`/products/${productId}/categories`,{categoryId: data.category})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            console.log(data);
            onCategoryAdded();
        })
        .catch((error)=>{
            console.error(`Error linking Category ${data.category} to Product ${productId}. ->`,error);
        })
    }

    return(
        <div className="">
            {categories.length > 0 &&
            <form onSubmit={handleSubmit(add)} className="flex items-center h-10 space-x-2">
                <select {...register("category")} defaultValue={categories[0].id} className="std-input h-full">
                    {categories.map((category:CategoryType)=>
                        <option key={category.id} value={category.id}>{category.name}</option>
                    )}
                </select>
                <button type="submit" className="std-button bg-sky-600 h-full">Add</button>
            </form>
            }
        </div>
    )
}
export default AddCategory;