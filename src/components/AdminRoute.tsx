import { useState, useEffect, useContext, ReactNode } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Navigate, useLocation } from "react-router";

const AdminRoute = ({children}: { children: ReactNode }) => {

    const { user } = useContext(GlobalContext);
    const location = useLocation();

    if(!user || user?.role === "admin"){
        return <>{children}</>
    }

    return( 
        <Navigate to={"/"} replace state={{from:location}}/>
    )
}

export default AdminRoute;