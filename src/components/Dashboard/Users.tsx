import { useState, useEffect } from "react";
import api from "@/api/api.ts";
import { Link } from "react-router";

const Users = () => {

    const [users,setUsers] = useState<UserType[]>([]);

    const fetchUsers = () => {
        api.get(`/users`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setUsers(data);
        })
        .catch((error)=>{
            console.error(`Error fetching users -> `,error);
        })
    }

    useEffect(()=>{
        fetchUsers();
    },[]);

    return(
        <div>
            <div className="std-panel">
                <table className="std-table">
                    <thead>
                        <tr>
                            <th>Id</th><th>Name</th><th>Role</th><th>Mail</th><th>Phone</th><th>Commands</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user:UserType)=>
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.role}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td className="spce-x-2"><Link to={`/dashboard/users/edit/${user.id}`} className="std-button bg-sky-600">Edit</Link></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Users;