import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { Link } from "react-router";
const Categories = () => {
    const [categories,setCategories] = useState<any>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchCategories = () => {
        axios.get(`http://localhost:3000/categories`,{withCredentials:true})
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

    const nestObjects = (arr:any) => {
        const nested:any = [];
        const map = new Map();
      
        arr.forEach((item:any) => map.set(item.id, { ...item, children: [] }));
      
        arr.forEach((item:any) => {
          if (item.parent === 0 || item.parent === undefined || item.parent === null) {
            nested.push(map.get(item.id));
          } else {
            map.get(item.parent).children.push(map.get(item.id));
          }
        });
      
        return nested;
    }

    const onSubmit = (data:any) => {
        const {name,parent} = data;
        axios.post(`http://localhost:3000/categories/create`,{name,parent},{withCredentials:true})
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

    const Category = (props: {category: any}) => {
        const { category } = props;
        return(
            <div className="px-4 space-y-2">
                <Link to={`/dashboard/categories/edit/${category.id}`} className={`cursor-pointer flex items-center space-x-1 text-primary-800 hover:text-sky-600 transition`}><FaChevronRight className="text-xs"/><span>{category.name}</span></Link>
                {category.children ? <>{category.children.map((nCategory:any)=><Category key={nCategory.id} category={nCategory}/>)}</> : "no children"}
            </div>
        )
    }

    return(
        <div>
            <div className="std-panel">
                {Array.isArray(categories) ? categories.map((category:any)=>
                    <Category key={category.id} category={category}/>
                ) : <>Not an array</>}
            </div>
        </div>
    )
}
export default Categories;