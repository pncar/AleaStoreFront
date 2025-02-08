import { useState,useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.tsx";
import { Link } from "react-router";
const Users = () => {
    const [users,setUsers] = useState<any>(null);
    const [userProducts,setUserProducts] = useState<any>([]);
    const [viewingUser,setViewingUser] = useState<number>(0);

    const fetchUsers = () => {
        setViewingUser(0);
        axios.get(`http://localhost:3000/users`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setUsers(data);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    const fetchUserProducts = (id:number) => {
        axios.get(`http://localhost:3000/products/user/${id}`)
        .then((response)=>{
            return response.data
        })
        .then((data)=>{
            console.log(data);
            setUserProducts(data);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    useEffect(()=>{
        fetchUsers();
    },[]);

    useEffect(()=>{
        if(users){
            fetchUserProducts(users[viewingUser].id);
        }
    },[users,viewingUser]);

    const handleDelete = (id:number) => {
        axios.post(`http://localhost:3000/users/${id}/delete`)
        .then((response)=>{
            console.log(response);
        })
        .then(()=>{
            fetchUsers();
        })
    }


    return(
        <div>
            <Navbar/>
            <div className="flex flex-wrap lg:flex-nowrap container w-full m-auto">
                <div className="w-full p-8">
                    <div>
                        {
                            users ?
                            <div className="p-3 rounded-md border border-primary-300 space-y-2">
                                <div>{users[viewingUser].name}</div>
                                <div>{users[viewingUser].email}</div>
                                <div>{users[viewingUser].phone}</div>
                                <div className="flex space-x-2">
                                    <button onClick={()=>{handleDelete(users[viewingUser].id)}} className="bg-red-600 text-primary-50 rounded-md p-1 px-3 font-semibold text-xs cursor-pointer">Delete</button>
                                    <Link to={`/profile/${users[viewingUser].id}`} className="std-button bg-primary-900">Go to Profile</Link>
                                </div>
                                <hr className="border-primary-300"/>
                                <>{userProducts && userProducts.map((product:any,key:number)=>
                                    <div key={key}>
                                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                                    </div>
                                )}
                                </>
                            </div>:
                            <></>
                        }
                    </div>
                </div>
                <div className="w-full lg:w-1/3 py-8">
                    {users ?
                        <table className="table-auto p-2 rounded-md border border-primary-200 shadow-md m-auto container">
                            <thead>
                            <tr>
                                <th className="p-2 px-4 text-left">Name</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((user:any,key:number)=>
                                <tr key={key} className={`${viewingUser === key ? "bg-sky-100 hover:bg-sky-50" : ""} transition-all hover:bg-primary-100 cursor-pointer`} onClick={()=>{setViewingUser(key)}}>
                                    <td className="p-2 px-4 border-b border-primary-200">
                                        {user.name}
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>:
                        <>
                            <p>Users not loaded yet</p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
export default Users;