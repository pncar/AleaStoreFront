import { useContext, ReactNode } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Navigate, useLocation } from "react-router";

const RoleRoute = ({children, roles}: { children: ReactNode, roles:string[] }) => {

    const { user } = useContext(GlobalContext);
    const location = useLocation();

    if(user){
        if(!roles.includes(user.role)){
            return <Navigate to={"/"} replace state={{from:location}}/>
        }
        return( 
            <>{children}</>
        )
    }else{
        return(
            <div className="container m-auto w-full items-center justify-center min-h-[60vh] flex">Unauthorized</div>
        )
    }

}

export default RoleRoute;