import api from "@/api/api.ts";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Swal from "sweetalert2";
const Profile = () => {

    const { user : self } = useContext(GlobalContext);

    const [user,setUser] = useState<UserType|null>(null);

    const { id } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const fetchUser = (u:string) => {
        api.get(`/users/${u}`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setUser(data);
        })
        .catch((error)=>{
            console.log(`Error fetching user -> `,error);
        });
    }

    useEffect(()=>{
        if(id){
            fetchUser(id);
        }else if(self){
            fetchUser(self.id.toString());
        }else{
            console.log("No user to show");
        }
    },[self]);

    const updateUser:SubmitHandler<FieldValues> = (data) => {
        const {name, email, phone} = data;
        api.patch(`/users/${id}`,{name, email, phone})
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
        <div className="bg-primary-300 min-h-screen">
            <div className="container w-full m-auto p-2 md:p-4">
                <div className="w-full lg:w-2/5">
                    <>
                        {user?
                        <div className="space-y-2">
                            <div className="flex bg-white p-6 rounded-md">
                                <div className="px-4 space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <p className="font-bold text-2xl">{user.name}</p>
                                        {user.role === "seller" && <span className="bg-yellow-300 text-yellow-800 p-1 px-3 text-xs rounded-md">Seller</span>}
                                    </div>
                                    <p className="text-primary-500">@{user.handle}</p>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                            <div className="bg-white flex-col space-y-4 p-6 md:p-10 rounded-md">
                                <h3 className="font-semibold">User Info</h3>
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
                                    <button type="submit" className="std-button bg-primary-950 !text-sm">Update</button>
                                </form>
                            </div>
                        </div>
                        :<></>
                        }
                    </>
                </div>
            </div>
    </div>
    )
}
export default Profile;