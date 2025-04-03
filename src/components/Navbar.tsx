import { Link } from "react-router";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { FaUser, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    const { user, userOrders, tryLogOut, cart } = useContext(GlobalContext);

    return(
        <div className="bg-white shadow-lg p-6">
            <div className="container flex flex-col md:flex-row w-full m-auto space-x-6 items-center justify-items-stretch">
                <div className="flex">
                    <div className="flex-grow">
                        <Link to="/" className="font-bold text-lg">MyStore</Link>
                    </div>
                    <div className="w-full hidden md:flex flex-grow">
                        <ul className="space-x-6 flex items-center">
                            <li><Link to="/products">Products</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border flex-grow justify-items-end ">
                    <div className="w-full">
                        {!user ? <div className="flex w-full space-x-2 justify-end">
                            <Link to="/login" className="std-button bg-primary-800">Log In</Link>
                            <Link to="/sign-up" className="std-button bg-sky-600">Sign Up</Link>
                        </div>:
                        <div className="flex w-full items-center justify-end">
                            {cart && 
                            <Link to={`/cart`} className="flex space-x-2 items-center w-full justify-end">
                                <FaShoppingCart className="text-lg"/><div className="w-8 h-8 bg-sky-600 p-1 rounded-md flex items-center justify-center text-primary-50 font-semibold text-xs">{`${cart.length}`}</div>
                            </Link>}
                            <div className="group relative w-full flex justify-end">
                                <div className="flex items-center justify-center space-x-2">
                                    <FaUser className="text-lg"/><span className="relative hidden md:inline-block">{user.name}</span>
                                </div>
                                <div className="overflow-hidden text-sm w-full bg-primary-50 top-6 rounded-b-md border border-primary-300 hidden group-hover:block absolute origin-top-right">
                                    <Link to={`/profile/${user.id}`} className="std-dd-button">Profile</Link>
                                    {user?.role === "admin" ? <Link to={"/dashboard"} className="std-dd-button">Dashboard</Link> : <></>}
                                    <Link to={`/cart`} className="std-dd-button">({cart?.length})</Link>
                                    <Link to={`/orders`} className="std-dd-button">Orders ({userOrders?.length})</Link>
                                    <button onClick={tryLogOut} className="w-full p-2 cursor-pointer bg-primary-50 hover:bg-primary-100">Log Out</button>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;