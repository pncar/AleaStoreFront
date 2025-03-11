import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Sections = () => {

    const [sections,setSections] = useState<any>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchSections = () => {
        axios.get(`http://localhost:3000/sections/`,{withCredentials:true})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setSections(data);
        })
        .catch((error)=>{
            console.error(error);
        })
    }
    const createSection = (data:any) => {
        const { name } = data;
        axios.post(`http://localhost:3000/sections/create`,{name},{withCredentials:true})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            console.log(data);
            fetchSections();
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    useEffect(()=>{
        fetchSections();
    },[]);

    return(
        <div className="std-panel">
            <div className="std-panel">
                <p className="text-xs font-semibold">Create new Section</p>
                <form onSubmit={handleSubmit(createSection)} className="flex space-x-1">
                    <input {...register("name")} type="text" className="std-input"/>
                    <button type="submit" className="std-button bg-sky-600">Create</button>
                </form>
            </div>
            <div className="std-panel">
                <table className="std-table">
                        <thead>
                            <tr>
                                <th>Id</th><th>Name</th><th>Commands</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sections.map((section:any)=>
                                <tr key={section.id}>
                                    <td>
                                        {section.id}
                                    </td>
                                    <td>
                                        {section.name}
                                    </td>
                                    <td className="space-x-2">
                                        <Link to={`/dashboard/sections/edit/${section.id}`} className="std-button bg-sky-600">Edit</Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                </table>
            </div>
        </div>
    )
}
export default Sections;