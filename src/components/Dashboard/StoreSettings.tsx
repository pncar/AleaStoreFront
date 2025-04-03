import api from "@/api/api.ts";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const StoreSettings = () => {

    const [settings,setSettings] = useState<StoreSettingsType|null>(null);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchSettings = () => {
        api.get('/store')
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setSettings(data);
        })
        .catch((error)=>{
            console.error(error);
        })
    }
    
    useEffect(()=>{fetchSettings();},[]);

    const updateStoreSettings:SubmitHandler<FieldValues> = (data) => {
        const { store_name, store_subtitle, store_slug } = data;
        api.patch('/store',{store_name,store_subtitle,store_slug})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            Swal.fire({
                title: 'Store Updated',
                text: data,
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(()=>{
                navigate(0);
            })
        })
        .catch((error)=>{
            console.error(error);
            Swal.fire({
                title: 'Error Updating Store',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        })
    }
    
    return(
        <div className="w-full md:w-2/5 bg-primary-200 p-6 rounded-md border border-primary-300">
            
            {settings &&
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Store Settings</h3>
                <form onSubmit={handleSubmit(updateStoreSettings)} className="w-full space-y-2">
                    <div className="std-form-input !bg-primary-300">
                        <label>Store Name</label>
                        <input type="text" {...register("store_name")} defaultValue={settings.store_name}/>
                    </div>
                    <div className="std-form-input !bg-primary-300">
                        <label>Store Subtitle</label>
                        <input type="text" {...register("store_subtitle")} defaultValue={settings.store_subtitle}/>
                    </div>
                    <div className="std-form-input !bg-primary-300">
                        <label>Store Slug</label>
                        <input type="text" {...register("store_slug")} defaultValue={settings.store_slug}/>
                    </div>
                    <button type="submit" className="std-button bg-sky-600">Submit</button>
                </form>
            </div>
            }
        </div>
    )
}
export default StoreSettings;