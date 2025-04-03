import { useState, useEffect } from "react";
import { useParams } from "react-router";
import api from "@/api/api.ts";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Swal from "sweetalert2";
const EditUser = () => {
    const { id } = useParams();
    const [user,setUser] = useState<UserType|null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchUser = () => {
        api.get(`/users/${id}`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setUser(data);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    useEffect(()=>{
        fetchUser();
    },[]);

    const updateUser:SubmitHandler<FieldValues> = (data) => {
        const {name, email, phone, role} = data;
        api.patch(`/users/${id}`,{name, email, phone, role })
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            Swal.fire({
                title: 'User Updated',
                text: data,
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        })
        .catch((error)=>{
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        })
    }

    return(
    <div>
        Editing User {id}
        <div>
            { user ? 
            <div className="std-panel">
                <form onSubmit={handleSubmit(updateUser)} className="space-y-2">
                    <div className="std-form-input">
                        <label>Name</label>
                        <input {...register("name")} autoFocus type="text" defaultValue={user.name}/>
                    </div>
                    <div className="std-form-input">
                        <label>Mail</label>
                        <input {...register("email")} type="text" defaultValue={user.email}/>
                    </div>
                    <div className="std-form-input">
                        <label>Phone</label>
                        <input {...register("phone")} type="number" defaultValue={Number(user.phone)}/>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label>Role</label>
                        <select {...register("role")} defaultValue={user.role} className="p-2 px-4 rounded-md border border-primary-300">
                            <option value={"admin"}>Admin</option>
                            <option value={"user"}>User</option>
                        </select>
                    </div>
                    <button type="submit" className="std-button bg-primary-950">Submit</button>
                </form>
            </div>
            :<>No user</>
            }
        </div>
    </div>
    )
}
export default EditUser;