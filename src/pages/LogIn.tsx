import { Link } from "react-router";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Navbar from "../components/Navbar.tsx";
import { useForm } from 'react-hook-form';
const LogIn = () => {

    const { user, tryLogIn, tryLogOut } = useContext(GlobalContext);

    const onSubmit = (data:any) => {
        const {id,email,password} = data;
        tryLogIn(id,email,password);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return(
        <div>
            <Navbar/>
            <div className="container w-full m-auto flex justify-center my-8">
                <div className="w-full md:w-2/3 bg-white rounded-md p-8 shadow-lg border border-primary-300">
                    {!user?<>
                    <h3 className="font-bold text-xl font-sky-600 p-2">Log In</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-2 space-y-2">
                        <input {...register('email')}  type="text" defaultValue="user@gmail.com" placeholder="Your Mail" className="w-full bg-primary-200 p-2 px-3 rounded-md border border-primary-300 focus:border-primary-600 transition-all"/>
                        <input  {...register('passord')} type="password" defaultValue="password" placeholder="Your Password" className="w-full bg-primary-200 p-2 px-3 rounded-md border border-primary-300 focus:border-primary-600 transition-all"/>
                        <button type="submit" className="cursor-pointer bg-primary-900 text-primary-50 p-2 px-3 rounded-md text-sm">Log In</button>
                    </form>
                    <p className="py-2 text-xs">Don't have an account? <Link to="/sign-up" className="font-bold text-sky-600 block text-sm">Sign In</Link></p>
                    </>:
                    <>
                        <div className="space-y-2">
                            <p>You are already logged in</p>
                            <p>{JSON.stringify(user)}</p>
                            <button type="submit" onClick={tryLogOut} className="cursor-pointer bg-primary-900 text-primary-50 p-2 px-3 rounded-md text-sm">Log Out</button>
                        </div>
                    </>}
                </div>
            </div>
        </div>
    )
}
export default LogIn;