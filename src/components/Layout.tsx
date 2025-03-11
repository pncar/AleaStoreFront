import { ReactNode } from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
const Layout = ({children}: { children: ReactNode }) => {
    return(
        <div className="bg-primary-50">
            <Navbar/>
            <div className="min-h-screen">
                {children}
            </div>
            <Footer/>
        </div>
    )
}
export default Layout;