import { Link, useNavigate } from "react-router";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext.tsx';
import Navbar from "../components/Navbar.tsx";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { faker } from '@faker-js/faker';
import Swal from 'sweetalert2';

const SignUp = () => {

    //const { user, tryLogIn, tryLogOut } = useContext(GlobalContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    
    const onSubmit = (data:any) => {
        const {name, email , password, phone} = data;
        console.log(data);
        axios.post(`http://localhost:3000/users/create`,{name,email,password,phone})
        .then((response)=>{
            return response;
        })
        .then(()=>{
            Swal.fire({
                title: 'Account created',
                text: 'Your account was created succesffully.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            navigate("/");
        })
    }

    return(
        <div>
            <Navbar/>
            <div className="container w-full m-auto flex justify-center my-8">
                <div className="w-full md:w-2/3 bg-white rounded-md p-8 shadow-lg border border-primary-300">
                    <div>
                            <h3 className="font-bold my-2">Create new User</h3>
                            <div>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                                    <input {...register('name')} type="text" defaultValue={faker.person.fullName()} name="name" className="w-full rounded-md border border-primary-400 p-2 px-3" placeholder="User Name"/>
                                    <input {...register('email')} type="text" name="email" defaultValue={faker.internet.email()} className="w-full rounded-md border border-primary-400 p-2 px-3" placeholder="E-Mail"/>
                                    <input {...register('password')} type="password" name="password" defaultValue={"password"} className="w-full rounded-md border border-primary-400 p-2 px-3" placeholder="Password"/>
                                    <input {...register('phone')} type="text" name="phone" defaultValue={faker.phone.number({ style: 'international' })} className="w-full rounded-md border border-primary-400 p-2 px-3" placeholder="Phone"/>
                                    <button type="submit" className="cursor-pointer p-2 px-3 bg-primary-900 text-primary-200 rounded-md font-semibold">Create User</button>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignUp;