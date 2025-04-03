import { Link, useLocation } from "react-router";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import ASLogo from "@/assets/AS_Store_logo_2.svg";
import { useState, useRef } from "react";
import { useClickAway } from "react-use";

const NavbarNew = () => {
    const { user, userOrders, tryLogOut, cart, storeInfo } = useContext(GlobalContext);
    const [open,setOpen] = useState<boolean>(false);
    const [openLowBar,setOpenLowBar] = useState<boolean>(false);

    const ref = useRef(null);
    const location = useLocation();

    useClickAway(ref, () => setOpen(false));

    const logo = ASLogo;

    return(
        <div className="shadow-lg bg-white">
            <div className="flex container w-full m-auto items-center p-2">
                <div className="flex flex-1 items-center space-x-2">
                    <GiHamburgerMenu onClick={()=>{setOpenLowBar(!openLowBar)}} className="cursor-pointer md:hidden"/>
                    <Link to="/" className="font-bold text-lg flex space-x-2 items-center">
                        {logo ? <img src={ASLogo} className="w-32"/> :
                        <>{storeInfo?.store_name}</>
                        }
                    </Link>
                </div>
                <div className="flex-initial">
                    {!user ? 
                    <div className="flex w-full space-x-2 justify-end">
                            <Link to="/login" className="std-button bg-primary-800">Log In</Link>
                            <Link to="/sign-up" className="std-button bg-sky-600">Sign Up</Link>
                    </div>:
                    <div className="flex space-x-4">
                        {cart && 
                        <Link to={`/cart`} className="flex space-x-2 items-center w-full justify-end">
                            <FaShoppingCart className="text-lg"/><div className="w-8 h-8 bg-sky-600 p-1 rounded-md flex items-center justify-center text-primary-50 font-semibold text-xs">{`${cart.length}`}</div>
                        </Link>}
                        <div className="group relative w-full flex justify-end">
                            <div onClick={()=>{setOpen(!open)}} className="cursor-pointer flex items-center justify-center md:space-x-2 hover:bg-primary-300 p-2 rounded-md transition-all">
                                <FaUser className="text-lg"/><span className="hidden md:inline-block text-nowrap">{user.name}</span>
                            </div>
                            {open &&
                            <div ref={ref} className="overflow-hidden text-sm w-64 bg-primary-50 top-8 rounded-b-md border border-primary-300 absolute origin-top-right">
                                <Link to={`/profile/${user.id}`} className="std-dd-button">Profile</Link>
                                {user?.role === "admin" ? <Link to={"/dashboard"} className="std-dd-button">Dashboard</Link> : <></>}
                                <Link to={`/cart`} className="std-dd-button">Cart ({cart?.length})</Link>
                                <Link to={`/orders`} className="std-dd-button">Orders ({userOrders?.length})</Link>
                                <button onClick={tryLogOut} className="w-full p-2 cursor-pointer bg-primary-50 hover:bg-primary-100">Log Out</button>
                            </div>}
                        </div>
                    </div>
                    }
                </div>
            </div>
            <div className={`bg-primary-800 text-primary-100 overflow-hidden ${openLowBar ? "max-h-auto" : "max-h-0 md:max-h-full"}`}>
                <div className="p-4 flex flex-col md:flex-row container w-full m-auto md:items-center justify-center space-y-4 md:space-y-0 md:space-x-6 tracking-wider">
                    <Link to="/products" className={`${location.pathname.startsWith("/products") ? "text-sky-300" : "text-primary-50"}`}>Products</Link>
                    <Link to="/faq" className={`${location.pathname.startsWith("/faq") ? "text-sky-300" : "text-primary-50"}`}>Help</Link>
                    <Link to="/terms_and_conditions" className={`${location.pathname.startsWith("/terms_and_conditions") ? "text-sky-300" : "text-primary-50"}`}>Terms and Conditions</Link>
                </div>
            </div>
        </div>
    )
}
export default NavbarNew;