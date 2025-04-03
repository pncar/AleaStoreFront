import { faker }from "@faker-js/faker";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router";
const TermsConditions = () => {

    const navigate = useNavigate();
    
    return(
        <div className="lg:p-8">
            <div className="std-panel min-h-screen container w-full lg:w-2/3 m-auto !space-y-8 !p-6">
                <div className="flex items-center space-x-4">
                    <FaChevronLeft onClick={()=>{navigate(-1)}} className="cursor-pointer text-sky-600"/>
                    <h2 className="flex-1 font-bold text-2xl">Terms & Conditions</h2>
                </div>
                <div className="space-y-6">
                    <h3 className="font-semibold text-sky-600">1. Buying</h3>
                    <p className="leading-7 ml-4">{faker.lorem.paragraph(8)}</p>
                    <h3 className="font-semibold text-sky-600">2. Warranty</h3>
                    <p className="leading-7 ml-4">{faker.lorem.paragraph(24)}</p>
                </div>
            </div>
        </div>
    )
}
export default TermsConditions;