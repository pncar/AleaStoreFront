import { faker } from "@faker-js/faker";
import _ from "lodash";
import { useState } from "react";
import { FaChevronDown, FaChevronLeft} from "react-icons/fa";
import { useNavigate } from "react-router";

const FAQ = () => {

    const navigate = useNavigate();
    const questions = [];

    for(let i=0;i<8;i++){
        questions.push(
            {
                id: i+1,
                title: _.capitalize(faker.lorem.word()),
                body: faker.lorem.paragraph(16)
            }
        )
    }

    const Question = (props: {title: string, body: string}) => {
        const { title, body } = props;
        const [open,setOpen] = useState<boolean>(false);
        return(
            <div className="flex flex-col rounded-md overflow-hidden border border-primary-300">
                <div onClick={()=>{setOpen(!open)}} className="flex  items-center cursor-pointer p-3 px-5 bg-primary-300 text-primary-900">
                    <p className="flex-1 font-semibold">{title}</p>
                    <FaChevronDown className={`transition-all ${ open ? "rotate-180" : "rotate-0"}`}/>
                </div>
                <div className={`${open ? "block" : "hidden"} p-6`}>
                    <p>{body}</p>
                </div>
            </div>
        )
    }
    
    return(
        <div className="lg:p-8">
            <div className="container m-auto w-full md:w-2/3 std-panel !p-6">
                <div className="flex items-center space-x-4">
                    <FaChevronLeft onClick={()=>{navigate(-1)}} className="cursor-pointer text-sky-600"/>
                    <h2 className="flex-1 font-bold text-2xl">Frequently Asked Questions</h2>
                </div>
                <div className="container m-auto w-full space-y-2 p-4">
                    {questions.map((q)=>
                        <Question key={q.id} title={q.title} body={q.body}/>
                    )}
                </div>
            </div>
        </div>
    )
}
export default FAQ;