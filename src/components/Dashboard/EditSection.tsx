import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
const EditSection = () => {
    const { id } = useParams();

    const [section,setSection] = useState<any>();
    const [allCategories,setAllCategories] = useState<any>([]);
    const [associatedCategories,setAssociatedCategories] = useState([]);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchSection = () => {
        axios.get(`http://localhost:3000/sections/${id}`,{withCredentials:true})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setSection(data[0]);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const fetchAllCategories = () => {
        axios.get(`http://localhost:3000/categories/`,{withCredentials:true})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setAllCategories(data);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const fetchAssociatedCategories = () => {
        axios.get(`http://localhost:3000/sections/${id}/categories`,{withCredentials:true})
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
    
    useEffect(()=>{
        fetchSection();
        fetchAllCategories();
        fetchAssociatedCategories();
    },[]);

    const addCategory = (data:any) => {
        const { sectionId } = data;
        axios.post(`http://localhost:3000/sections/add-category/`,{sectionId, categoryId: data.categoryId},{withCredentials:true})
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

    const updateSection = (data:any) => {
        const { name } = data;
        console.log(`ID -> ${id}, NAME -> ${name}`);
        axios.post(`http://localhost:3000/sections/${id}/update`,{name},{withCredentials:true})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            console.log(data);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const removeCategory = (sectionId: number, categoryId: number) => {
        axios.post(`http://localhost:3000/sections/remove-category/`,{sectionId,categoryId},{withCredentials:true})
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

    const deleteSection = () => {
        axios.post(`http://localhost:3000/sections/${id}/delete`,null,{withCredentials:true})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            console.log(data);
            navigate(`/dashboard/sections`);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    return(
        <div className="std-panel">
            <button onClick={()=>{navigate(-1)}} className="std-button bg-primary-950">Back</button>
            <div className="space-y-1">
                Section {id}
                <form onSubmit={handleSubmit(addCategory)} className="flex space-x-1">
                    <input {...register("sectionId")} value={id} type="hidden"/>
                    <select {...register("categoryId")} className="std-input">
                        {allCategories?.map((option:any)=>
                            <option key={option.id} value={option.id}>{option.name}</option>
                        )}
                    </select>
                    <button type="submit" className="std-button bg-sky-600">Add</button>
                </form>
                {section &&
                    <form onSubmit={handleSubmit(updateSection)} className="flex space-x-1">
                        <input {...register("name")} defaultValue={section.name} className="std-input"/>
                        <button className="std-button bg-sky-600">Update</button>
                    </form>
                }
                <button onClick={()=>{deleteSection()}} className="std-button bg-red-600">Delete Section</button>
            </div>
            <table className="std-table">
                <thead>
                    <tr>
                        <th>Id</th><th>Name</th><th>Commands</th>
                    </tr>
                </thead>
                <tbody>
                    {associatedCategories?.map((category:any)=>
                        <tr key={category.id}>
                            <td>{category.id}</td><td>{category.name}</td><td><button onClick={()=>{removeCategory(Number(id),category.id)}} className="std-button bg-red-600">Remove</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default EditSection;