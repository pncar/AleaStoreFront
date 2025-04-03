import { Link, useNavigate } from "react-router";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
const LogIn = () => {

    const { user, tryLogIn, tryLogOut } = useContext(GlobalContext);

    const navigate = useNavigate();

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
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
            <div className="container w-full m-auto flex justify-center my-8">
                <div className="w-full md:w-2/3 bg-white rounded-md p-8 shadow-lg border border-primary-300">
                    {!user?<>
                    <h3 className="font-bold text-xl font-sky-600 p-2">Log In</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-2 space-y-2">
                        <input {...register('email')}  type="text" defaultValue="user@gmail.com" placeholder="Your Mail" className="w-full bg-primary-200 p-2 px-3 rounded-md border border-primary-300 focus:border-primary-600 transition-all"/>
                        <input  {...register('password')} type="password" defaultValue="password" placeholder="Your Password" className="w-full bg-primary-200 p-2 px-3 rounded-md border border-primary-300 focus:border-primary-600 transition-all"/>
                        <button type="submit" className="std-button bg-primary-950">Log In</button>
                    </form>
                    <p className="py-2 text-xs">Don't have an account? <Link to="/sign-up" className="font-bold text-sky-600 block text-sm">Sign Up</Link></p>
                    </>:
                    <>
                        <div className="space-y-2">
                            <p>You are already logged in</p>
                            <p>{JSON.stringify(user)}</p>
                            <div className="space-x-2">
                                <button type="submit" onClick={()=>{navigate(-1)}} className="std-button bg-primary-950">Go Back</button>
                                <button type="submit" onClick={tryLogOut} className="std-button bg-primary-950">Log Out</button>
                            </div>
                        </div>
                    </>}
                </div>
            </div>
        </div>
    )
}
export default LogIn;