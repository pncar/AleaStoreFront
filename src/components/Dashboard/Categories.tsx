import { useState, useEffect } from "react";
import api from "@/api/api.ts";
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { TbPointFilled } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { faker } from "@faker-js/faker";
import Swal from "sweetalert2";
import _ from "lodash";

import { Link } from "react-router";
const Categories = () => {
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
            console.log(nestObjects(data));
            setCategories(nestObjects(data));
        })
        .catch((error)=>{
            console.error(`Error fetching categories ->`,error);
        })
    }

    useEffect(()=>{
        fetchCategories();
    },[]);

    const nestObjects = (arr:CategoryType[]) => {
        const nested:CategoryType[] = [];
        const map = new Map();
      
        arr.forEach((item:CategoryType) => map.set(item.id, { ...item, children: [] }));
      
        arr.forEach((item:CategoryType) => {
          if (item.parent === 0 || item.parent === undefined || item.parent === null) {
            nested.push(map.get(item.id));
          } else {
            map.get(item.parent).children.push(map.get(item.id));
          }
        });
      
        return nested;
    }

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        const {name} = data;
        api.post(`/categories/create`,{name,parent:null})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            console.log(data);
            fetchCategories();
        })
        .catch((error)=>{
            console.error(`Error creating category ->`,error);
        })
    }

    const createCategory:SubmitHandler<FieldValues> = (data) => {
        const {name,parent} = data;
        api.post(`/categories/`,{name,parent})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            fetchCategories();
        })
        .catch((error)=>{
            console.error(`Error creating category ->`,error);
        })
    };

    const Category = (props: {category: CategoryType}) => {
        const { category } = props;
        return(
            <div className="px-4 space-y-2">
                <Link to={`/dashboard/categories/edit/${category.id}`} className={`cursor-pointer flex items-center space-x-1 text-primary-800 hover:text-sky-600 transition`}>
                    <TbPointFilled className="text-xs"/><span>{category.name}</span>
                </Link>
                {category.children ? <>{category.children.map((nCategory:CategoryType)=><Category key={nCategory.id} category={nCategory}/>)}</> : "no children"}
            </div>
        )
    }

    return(
        <div className="space-y-2">
            <div className="std-panel w-full">
                <p className="text-xs font-semibold">Create Base Category</p>
                <form onSubmit={handleSubmit(createCategory)} className="space-x-1 flex">
                    <input type="text" {...register("name")} defaultValue={_.capitalize(faker.lorem.word())} className="std-input"/>
                    <button type="submit" className="std-button bg-sky-600"><IoMdAdd className="font-bold text-white"/></button>
                </form>
            </div>
            <div className="std-panel">
                {Array.isArray(categories) ? categories.map((category:CategoryType)=>
                    <Category key={category.id} category={category}/>
                ) : <>Not an array</>}
            </div>
        </div>
    )
}
export default Categories;