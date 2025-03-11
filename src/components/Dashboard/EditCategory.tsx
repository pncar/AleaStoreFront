import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router";
import { useForm } from 'react-hook-form';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { faker } from "@faker-js/faker";
import _ from "lodash";

const EditCategory = () => {
    const { id } = useParams();
    const [category,setCategory] = useState<any>(null);
    const [children,setChildren] = useState<any>([]);
    const [parent,setParent] = useState<any>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const navigate = useNavigate();

    const fetchCategory = () => {
        axios.get(`http://localhost:3000/categories/${id}`,{withCredentials:true})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setCategory(data[0]);
        })
        .catch((error)=>{
            console.error(error);
        });
    }

    const fetchChildren = () => {
        axios.get(`http://localhost:3000/categories/${id}/children`,{withCredentials:true})
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
        axios.get(`http://localhost:3000/categories/${category.parent}`,{withCredentials:true})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setParent(data[0]);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    useEffect(()=>{
        fetchCategory();
        setValue("parent",id);
    },[id]);
    
    useEffect(()=>{
        if(category){
            fetchChildren();
            fetchParent();
        }
    },[category]);

    const createCategory = useCallback((data:any) => {
        const {name,parent} = data;
        axios.post(`http://localhost:3000/categories/create`,{name,parent},{withCredentials:true})
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

    const deleteCategory = (categoryId:number) => {
        axios.post(`http://localhost:3000/categories/${categoryId}/delete`,null,{withCredentials:true})
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
                {parent && <p><Link to={`/dashboard/categories/edit/${parent.id}`} className="text-primary-600 space-x-2 flex items-center"><FaChevronLeft className="text-xs"/><span>{parent?.name}</span></Link></p>}
                <p className="font-bold text-xl">{category.name}</p>
                {children &&
                <>
                { children.length > 0 ? <>
                    <p className="font-semibold text-xs">Subcategories:</p>
                    <ul className="flex flex-col space-y-2 text-sm">
                        {children?.map((child:any)=>
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
                <div className="space-y-2 p-4 px-6 border border-primary-300 rounded-md">
                    <p className="text-xs font-semibold">Add Category</p>
                    <form onSubmit={handleSubmit(createCategory)} className="space-x-1 flex">
                        <input type="text" {...register("name")} defaultValue={_.capitalize(faker.lorem.word())} className="std-input"/>
                        <input type="hidden" {...register("parent")} value={id}/>
                        <button type="submit" className="std-button bg-sky-600"><IoMdAdd className="font-bold text-white"/></button>
                    </form>
                    <button onClick={()=>{deleteCategory(category.id)}} className="std-button bg-red-600">Delete Category</button>
                </div>
                </>
                }
            </>
            }
        </div>
    )
}
export default EditCategory;