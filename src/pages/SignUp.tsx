import { Link, useNavigate } from "react-router";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext.tsx';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import api from "@/api/api.ts";
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
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const {name, email , password, phone} = data;
        console.log(data);
        api.post(`/users/`,{name,email,password,phone})
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
            <div className="container w-full m-auto flex justify-center my-8">
                <div className="w-full md:w-2/3 bg-white rounded-md p-8 shadow-lg border border-primary-300">
                    <div>
                            <h3 className="font-semibold my-2 text-2xl">Create Your Account</h3>
                            <div>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 flex flex-col">
                                    <input {...register('name')} type="text" defaultValue={faker.person.fullName()} name="name" className="std-input" placeholder="User Name"/>
                                    <input {...register('email')} type="text" name="email" defaultValue={faker.internet.email()} className="std-input" placeholder="E-Mail"/>
                                    <input {...register('password')} type="password" name="password" defaultValue={"password"} className="std-input" placeholder="Password"/>
                                    <input {...register('phone')} type="text" name="phone" defaultValue={faker.phone.number({ style: 'international' })} className="std-input" placeholder="Phone"/>
                                    <button type="submit" className="std-button bg-primary-950">Create User</button>
                                </form>
                                <p className="py-2 text-xs">Already have an account? <Link to="/login" className="font-bold text-sky-600 block text-sm">Log In</Link></p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignUp;