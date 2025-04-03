import { Routes, Route, Link, useLocation } from "react-router";
import StoreSettings from "@/components/Dashboard/StoreSettings.tsx";
import Users from "@/components/Dashboard/Users.tsx";
import Categories from "@/components/Dashboard/Categories.tsx";
import Products from "@/components/Dashboard/Products.tsx";
import Discounts from "@/components/Dashboard/Discounts.tsx";
import Orders from "@/components/Dashboard/Orders.tsx";
import Sections from "@/components/Dashboard/Sections.tsx";
import EditUser from "@/components/Dashboard/EditUser.tsx";
import EditCategory from "@/components/Dashboard/EditCategory.tsx";
import EditProduct from "@/components/Dashboard/EditProduct.tsx";
import EditDiscount from "@/components/Dashboard/EditDiscount.tsx";
import EditSection from "@/components/Dashboard/EditSection.tsx";
const Dashboard = () => {

    const location = useLocation();

    return(
        <div className="container w-full m-auto">
            <h2 className="my-3 font-semibold text-2xl">Dashboard</h2>
            <div className="flex flex-col justify-around">
                <div className="w-1/3">
                    <ul className="flex space-x-1 text-primary-50 text-sm font-semibold">
                        <li><Link to="/dashboard/" className={`transition-all ${location.pathname === "/dashboard" || location.pathname === "/dashboard/" ? "bg-sky-600" : "bg-primary-400"} p-2 px-4 rounded-t-md block`}>Home</Link></li>
                        <li><Link to="/dashboard/users" className={`transition-all ${location.pathname.startsWith("/dashboard/users") ? "bg-sky-600" : "bg-primary-400"} p-2 px-4 rounded-t-md block`}>Users</Link></li>
                        <li><Link to="/dashboard/categories" className={`transition-all ${location.pathname.startsWith("/dashboard/categories") ? "bg-sky-600" : "bg-primary-400"} p-2 px-4 rounded-t-md block`}>Categories</Link></li>
                        <li><Link to="/dashboard/products" className={`transition-all ${location.pathname.startsWith("/dashboard/products") ? "bg-sky-600" : "bg-primary-400"} p-2 px-4 rounded-t-md block`}>Products</Link></li>
                        <li><Link to="/dashboard/orders" className={`transition-all ${location.pathname.startsWith("/dashboard/orders") ? "bg-sky-600" : "bg-primary-400"} p-2 px-4 rounded-t-md block`}>Orders</Link></li>
                        <li><Link to="/dashboard/discounts" className={`transition-all ${location.pathname.startsWith("/dashboard/discounts") ? "bg-sky-600" : "bg-primary-400"} p-2 px-4 rounded-t-md block`}>Discounts</Link></li>
                        <li><Link to="/dashboard/sections" className={`transition-all ${location.pathname.startsWith("/dashboard/sections")? "bg-sky-600" : "bg-primary-400"} p-2 px-4 rounded-t-md block`}>Sections</Link></li>
                    </ul>
                </div>
                <div className="w-full md:border border-primary-300 bg-primary-100 shadow-md p-1 md:p-4 md:rounded-b-md">
                    <Routes>
                        <Route path="/" element={
                            <div className="std-panel min-h-64 flex flex-col space-y-4 items-center justify-center">
                                <h3 className="text-3xl text-primary-600 font-light">Welcome to Dashboard</h3>
                                <StoreSettings/>
                            </div>
                        }/>
                        <Route path="/users" element={<Users/>}/>
                        <Route path="/categories" element={<Categories/>}/>
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/orders" element={<Orders/>}/>
                        <Route path="/discounts" element={<Discounts/>}/>
                        <Route path="/sections" element={<Sections/>}/>
                        <Route path="/users/edit/:id" element={<EditUser/>}/>
                        <Route path="/categories/edit/:id" element={<EditCategory/>}/>
                        <Route path="/products/edit/:id" element={<EditProduct/>}/>
                        <Route path="/discounts/edit/:id" element={<EditDiscount/>}/>
                        <Route path="/sections/edit/:id" element={<EditSection/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;