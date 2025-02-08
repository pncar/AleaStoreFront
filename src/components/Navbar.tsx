import { Link } from "react-router";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
const Navbar = () => {
    const { user, tryLogOut, getProtectedData, cart } = useContext(GlobalContext);

    return(
        <div className="bg-white shadow-lg p-4">
            <div className="container flex w-full m-auto space-x-2 items-center justify-items-stretch">
                <div className="flex-grow">
                    <Link to="/" className="font-bold text-lg">MyStore</Link>
                </div>
                <div className="flex-grow">
                    <ul className="space-x-2 flex items-center text-sm">
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/users">Users</Link></li>
                        <li><button onClick={getProtectedData} className="bg-gray-600 text-primary-50 p-2 px-4 rounded-md text-xs">Test</button></li>
                    </ul>
                </div>
                <div className="w-full justify-items-end">
                    <div className="">
                        {!user ? <div className="w-full space-x-2">
                            <Link to="/login" className="std-button bg-primary-800">Log In</Link>
                            <Link to="/sign-up" className="std-button bg-sky-600">Sign In</Link>
                        </div>:
                        <div className="group relative w-full">
                            <Link to="/login" className="relative text-sm">{user.name}</Link>
                            <div className="overflow-hidden text-sm w-40 bg-primary-50 rounded-b-md border border-primary-300 hidden group-hover:block absolute origin-top-right">
                                <Link to={`/profile/${user.id}`} className="std-dd-button">Profile</Link>
                                <Link to={`/publish/`} className="std-dd-button">Publish</Link>
                                <Link to={`/cart`} className="std-dd-button">Cart ({cart?.length})</Link>
                                <button onClick={tryLogOut} className="w-full p-2 cursor-pointer bg-primary-50 hover:bg-primary-100">Log Out</button>
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