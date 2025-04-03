import { useState, useEffect } from "react";
import api from "@/api/api.ts";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { Link } from "react-router";

const Sections = () => {

    const [sections,setSections] = useState<SectionType[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchSections = () => {
        api.get(`/sections/`)
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
    const createSection:SubmitHandler<FieldValues> = (data) => {
        const { name } = data;
        api.post(`/sections/`,{name})
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
                            {sections.map((section:SectionType)=>
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