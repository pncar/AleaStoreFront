import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
const Profile = () => {

    const { user : self } = useContext(GlobalContext);

    const [user,setUser] = useState<any>(null);

    const { id } = useParams();

    const fetchUser = (u:string) => {
        axios.get(`http://localhost:3000/users/${u}`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            if(data[0]){
                setUser(data[0]);
            }
        })
        .catch((error)=>{
            console.log(`Error fetching user -> `,error);
        });
    }

    useEffect(()=>{
        if(id){
            fetchUser(id);
        }else if(self){
            fetchUser(self.id);
        }else{
            console.log("No user to show");
        }
    },[self]);

    return(
        <div>
            <div className="container w-full m-auto flex justify-center my-8">
                <div className="w-full md:w-2/3 bg-white rounded-md p-8 shadow-lg border border-primary-300">
                    <>
                        {user?
                        <>
                            <div className="flex">
                                <div className="w-32">
                                    <img src={`https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png`}/>
                                </div>
                                <div className="px-4 space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <p className="font-bold text-xl">{user.name}</p>
                                        {user.role === "seller" && <span className="bg-yellow-300 text-yellow-800 p-1 px-3 text-xs rounded-md">Seller</span>}
                                    </div>
                                    <p className="text-primary-500">@{user.handle}</p>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                        </>
                        :<></>
                        }
                    </>
                </div>
            </div>
    </div>
    )
}
export default Profile;