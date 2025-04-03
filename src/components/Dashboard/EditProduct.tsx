import { useState, useEffect } from "react";
import api from "@/api/api.ts";
import { Link , useParams, useNavigate } from "react-router";
import { FaX } from "react-icons/fa6";
import AddDiscount from "../../components/AddDiscount.tsx";
import AddCategory from "../../components/AddCategory.tsx";
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import Swal from "sweetalert2";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product,setProduct] = useState<ProductType>();
    const [associatedDiscounts,setAssociatedDiscounts] = useState<DiscountType[]>([]);
    const [associatedCategories,setAssociatedCategories] = useState<CategoryType[]>([]);

    const [image,setImage] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchProduct = () => {
        api.get(`/products/${id}`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setProduct(data);
        })
        .catch((error)=>{
            console.error(`Error fetching product ${id} ->`,error);
        })
    }

    const fetchAssociatedDiscounts = () => {
        api.get(`/discounts/product/${id}`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setAssociatedDiscounts(data);
        })
        .catch((error)=>{
            console.error(`Error fetching associated discounts to product ${id} ->`,error);
        })
    }

    const removeDiscountFromProduct = (discountId: number) => {
        api.delete(`/products/${id}/discounts/${discountId}`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            console.log(data);
            fetchAssociatedDiscounts();
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const fetchAssociatedCategories = () => {
        api.get(`/categories/product/${id}`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setAssociatedCategories(data);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const removeCategoryFromProduct = (categoryId: number) => {
        api.delete(`/products/${id}/categories/${categoryId}`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            console.log(data);
            fetchAssociatedCategories();
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    useEffect(()=>{
        fetchProduct();
    },[]);

    useEffect(()=>{
        if(product){
            fetchAssociatedDiscounts();
            fetchAssociatedCategories();
        }
    },[product]);

    const handleDiscountAdded = () => {
        fetchProduct();
    }
    const handleCategoryAdded = () => {
        fetchProduct();
    }

    const updateData:SubmitHandler<FieldValues> = (data) => {
        const {name,price,description} = data;
        const formData = new FormData();

        formData.append("name",name);
        formData.append("price",price);
        formData.append("description",description);
        if(image){
            formData.append("image",image);
        }

        api.patch(`/products/${id}`,formData)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            Swal.fire({
                title: 'Product Updated Successfully',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            navigate(`/dashboard/products`);
        })
        .catch((error)=>{
            console.error(error);
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        })
    }

    const deleteProduct = (id:number) => {
        api.delete(`/products/${id}`)
        .then((response)=>{
            return response.data
        })
        .then(()=>{
            Swal.fire({
                title: 'Unpublished',
                text: 'Product was successfully deleted.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            navigate("/products");
        })
        .catch((error)=>{
            console.error(`Error deleting product`,error);
        })
    }

    return(
        <div className="space-y-2">
            <button className="std-button bg-primary-900" onClick={()=>{navigate(-1)}}>Back</button>
            <div className="std-panel space-y-3">
                    {product &&
                    <div className="space-y-8">
                        <div className="flex space-x-6">
                            <form  onSubmit={handleSubmit(updateData)} className="space-y-2 w-full">
                                    <div>
                                        Id {product.id}
                                    </div>
                                    <div className="p-3 px-4 space-y-1 rounded-md bg-white shadow-inner border border-primary-300 transition-all focus-within:outline-2 outline-sky-600 flex flex-col">
                                        <label className="text-xs text-primary-600">Name</label>
                                        <input {...register("name")} autoFocus type="text" className="focus:outline-0" defaultValue={product.name}/>
                                    </div>
                                    <div className="p-3 px-4 space-y-1 rounded-md bg-white shadow-inner border border-primary-300 transition-all focus-within:outline-2 outline-sky-600 flex flex-col">
                                        <label className="text-xs text-primary-600">Price</label>
                                        <input {...register("price")} type="number" step={10} className="focus:outline-0" defaultValue={product.price}/>
                                    </div>
                                    <div className="p-3 px-4 space-y-1 rounded-md bg-white shadow-inner border border-primary-300 transition-all focus-within:outline-2 outline-sky-600 flex flex-col">
                                        <label className="text-xs text-primary-600">Description</label>
                                        <textarea {...register("description")} rows={5} className="focus:outline-0" defaultValue={product.description}/>
                                    </div>
                                    <div className="space-y-2 w-full">
                                    <p>Image</p>
                                    <div className="space-y-2">
                                        <div  className="relative group">
                                            <div className="absolute w-full h-full bg-primary-500 opacity-0 group-hover:opacity-30">
                                            </div>
                                            { image ? 
                                            <>
                                                <button onClick={()=>{setImage(null)}} className="absolute z-10 w-8 h-8 bg-primary-500 rounded-full top-2 right-2 opacity-0 group-hover:opacity-100 text-primary-50 cursor-pointer">X</button>
                                                <img src={URL.createObjectURL(image)} className="object-cover w-full h-120"/>
                                            </>:
                                            <div className="flex items-center justify-center">
                                                    <input accept={".jpg, .jpeg, .webp, .png"} onChange={(e) => {setImage(e.target.files?.[0] || null)}} type="file" className="absolute z-10 p-2 px-3 rounded-md border border-primary-300 bg-primary-100"/>
                                                <img src={product.image ? `http://localhost:3000/uploads/${product.image}` : `https://www.svgrepo.com/show/508699/landscape-placeholder.svg`} className="object-cover w-full h-120"/>
                                            </div>
                                            }
                                        </div>
                                        <input accept={".jpg, .jpeg, .webp, .png"} onChange={(e) => {setImage(e.target.files?.[0] || null)}} type="file" className="p-2 px-3 rounded-md border border-primary-300"/>
                                    </div>
                                </div>
                                <button type="submit" className="std-button bg-primary-950">Submit</button>
                            </form>
                            <div className="space-y-2 w-full">
                                <div className="space-y-2 w-full">
                                    <p>Discounts</p>
                                    <div className="flex flex-col space-x-2 std-panel">
                                        <AddDiscount productId={product.id} onDiscountAdded={handleDiscountAdded}/>
                                        <div className="w-32">
                                        {associatedDiscounts.map((discount:DiscountType)=>
                                            <div key={discount.id} className="flex flex-col items-center p-4 bg-primary-300 rounded-md relative">
                                                <FaX onClick={()=>{removeDiscountFromProduct(discount.id)}} className="cursor-pointer right-2 top-2 text-xs absolute text-primary-600 hover:text-primary-900 transition-all"/>
                                                <p className="text-xs uppercase">{discount.name} <span className="font-bold">{discount.rate}%</span></p>
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 w-full">
                                    <p>Categories</p>
                                    <div className="flex flex-col space-x-2 std-panel">
                                        <AddCategory productId={product.id} onCategoryAdded={handleCategoryAdded}/>
                                        <div className="flex space-x-2">
                                        {associatedCategories.map((category:CategoryType)=>
                                            <div key={category.id} className="flex flex-col items-center p-4 bg-primary-300 rounded-md relative">
                                                <FaX onClick={()=>{removeCategoryFromProduct(category.id)}} className="cursor-pointer right-2 top-2 text-xs absolute text-primary-600 hover:text-primary-900 transition-all"/>
                                                <p className="text-xs px-2">{category.name}</p>
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 w-full">
                                    <p>Extra</p>
                                    <div className="flex flex-col space-x-2 std-panel">
                                        <div className="space-x-2">
                                            <Link to={`/product/${product.id}`} className="std-button bg-primary-600">View</Link>
                                            <button onClick={()=>{deleteProduct(product.id)}} className="std-button bg-red-600">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
            </div>
        </div>
    )
}
export default EditProduct;