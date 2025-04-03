import { useState, useEffect, useCallback } from "react";
import api from "@/api/api.ts";
import { Link, useParams, useNavigate } from "react-router";
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { faker } from "@faker-js/faker";
import Swal from "sweetalert2";
import _ from "lodash";

const EditCategory = () => {
    const { id } = useParams();
    const [category,setCategory] = useState<CategoryType|null>(null);
    const [children,setChildren] = useState<CategoryType[]>([]);
    const [parent,setParent] = useState<CategoryType|null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const navigate = useNavigate();

    const fetchCategory = () => {
        api.get(`/categories/${id}`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setCategory(data);
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    const fetchChildren = () => {
        api.get(`/categories/${id}/children`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setChildren(data);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const fetchParent = () => {
        if(category?.parent){
            api.get(`/categories/${category.parent}`)
            .then((response)=>{
                return response.data;
            })
            .then((data)=>{
                setParent(data);
            })
            .catch((error)=>{
                console.error(error);
            })
        }else{
            setParent(null);
        }
    }

    useEffect(()=>{
        fetchCategory();
        setValue("parent",id);
    },[id,parent]);
    
    useEffect(()=>{
        if(category){
            fetchChildren();
            fetchParent();
        }
    },[id,category]);

    const createCategory:SubmitHandler<FieldValues> = useCallback((data) => {
        const {name,parent} = data;
        api.post(`/categories`,{name,parent})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            fetchCategory();
        })
        .catch((error)=>{
            console.error(`Error creating category ->`,error);
        })
    },[id]);

    const updateCategory:SubmitHandler<FieldValues> = (data) => {
        const {categoryName:name} = data;
        api.patch(`/categories/${id}`,{name})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            Swal.fire({
                title: 'Category Updated Successfully',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            fetchCategory();
        })
        .catch((error)=>{
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            console.error(`Error updating category ->`,error);
        })
    }

    const deleteCategory = (categoryId:number) => {
        api.delete(`/categories/${categoryId}`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            console.log(data);
            navigate(`/dashboard/categories/`);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    return(
        <div className="std-panel">
            {category &&
            <>
                {parent ? 
                <p>
                    <Link to={`/dashboard/categories/edit/${parent.id}`} className="text-primary-600 space-x-2 flex items-center">
                        <FaChevronLeft className="text-xs"/><span>{parent?.name}</span>
                    </Link>
                </p>:
                <p>
                    <Link to={`/dashboard/categories`} className="text-primary-600 space-x-2 flex items-center">
                        <FaChevronLeft className="text-xs"/><span>All Categories</span>
                    </Link>
                </p>}
                {parent? <>Category {id} has Parent: {parent.name} ({parent.id})</>:<>Category {id} has No Parent</>}
                <p className="font-bold text-xl">{category.name}</p>
                {children &&
                <>
                { children.length > 0 ? <>
                    <p className="font-semibold text-xs">Subcategories:</p>
                    <ul className="flex flex-col space-y-2 text-sm">
                        {children?.map((child:CategoryType)=>
                            <li key={child.id}>
                                <Link to={`/dashboard/categories/edit/${child.id}`} className="group py-1 space-x-2 flex items-center text-primary-800 transition-all">
                                    <FaChevronRight className="text-xs"/><span>{child.name}</span>
                                    <FaXmark onClick={()=>{deleteCategory(child.id)}} className="hidden group-hover:block hover:text-red-600"/>
                                </Link>
                            </li>
                        )}
                    </ul></>:
                    <p className="font-semibold">No Subcategories</p>
                }
                <div className="flex p-4 px-6 border border-primary-300 rounded-md">
                    <div className="space-y-2 w-full">
                        <p className="text-xs font-semibold">Edit Category</p>
                        <form onSubmit={handleSubmit(updateCategory)} className="flex space-x-1">
                            <input type="text" {...register("categoryName")} defaultValue={category.name} className="std-input"/>
                            <button type="submit" className="std-button bg-sky-600">Update</button>
                        </form>
                        <button onClick={()=>{deleteCategory(category.id)}} className="std-button bg-red-600">Delete Category</button>
                    </div>
                    <div className="space-y-2 w-full">
                        <p className="text-xs font-semibold">Create Child Category</p>
                        <form onSubmit={handleSubmit(createCategory)} className="space-x-1 flex">
                            <input type="text" {...register("name")} defaultValue={_.capitalize(faker.lorem.word())} className="std-input"/>
                            <input type="hidden" {...register("parent")} value={id}/>
                            <button type="submit" className="std-button bg-sky-600"><IoMdAdd className="font-bold text-white"/></button>
                        </form>
                    </div>
                </div>
                </>
                }
            </>
            }
        </div>
    )
}
export default EditCategory;