import { useState, useEffect } from "react";
import api from "@/api/api.ts";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
const EditSection = () => {
    const { id } = useParams();

    const [section,setSection] = useState<SectionType>();
    const [allCategories,setAllCategories] = useState<CategoryType[]>([]);
    const [associatedCategories,setAssociatedCategories] = useState([]);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchSection = () => {
        api.get(`/sections/${id}`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setSection(data);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const fetchAllCategories = () => {
        api.get(`/categories/`)
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
        api.get(`/sections/${id}/categories`)
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

    const updateSection:SubmitHandler<FieldValues> = (data) => {
        const { name } = data;
        console.log(`ID -> ${id}, NAME -> ${name}`);
        api.patch(`/sections/${id}`,{name})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            console.log(data);
            Swal.fire({
                title: 'Category Updated Successfully',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const deleteSection = () => {
        api.delete(`/sections/${id}`)
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

    const addCategory:SubmitHandler<FieldValues> = (data) => {
        const { sectionId } = data;
        api.post(`/sections/${sectionId}/categories`,{categoryId: data.categoryId})
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

    const removeCategory = (sectionId: number, categoryId: number) => {
        api.delete(`/sections/${sectionId}/categories/${categoryId}`)
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

    return(
        <div className="std-panel">
            <button onClick={()=>{navigate(-1)}} className="std-button bg-primary-950">Back</button>
            <div className="space-y-1">
                Section {id}
                <form onSubmit={handleSubmit(addCategory)} className="flex space-x-1">
                    <input {...register("sectionId")} value={id} type="hidden"/>
                    <select {...register("categoryId")} className="std-input">
                        {allCategories?.map((option:CategoryType)=>
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
                    {associatedCategories?.map((category:CategoryType)=>
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