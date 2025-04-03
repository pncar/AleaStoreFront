import { useState, useEffect, useContext } from "react";
import CategorySection from "./components/CategorySection.tsx";
import api from "./api/api.ts";
import { faker }from "@faker-js/faker";
import _ from "lodash";
import { GlobalContext} from "@/context/GlobalContext";

const App = () => {

  const { storeInfo } = useContext(GlobalContext);

  const [sections,setSections] = useState<any>([]);

  const fetchSections = () => {
    api.get(`/sections/`)
    .then((response)=>{
      return response.data;
    })
    .then((data)=>{
      console.log(data);
      setSections(data);
    })
    .catch((error)=>{
      console.error(error);
    })
  }

  useEffect(()=>{
    fetchSections();
  },[]);


  return (
    <>
      <div className="bg-zinc-100 min-h-screen">
        <div className="bg-orange-400 bg-gradient-to-b from-slate-300 to-primary-100 h-100 text-primary-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-extrabold font-host-grotesk text-sky-950">{storeInfo?.store_name}</h1>
            <p className="text-sky-900 text-xl">{storeInfo?.store_subtitle}</p>
          </div>
        </div>
        <div className="p-2 md:p-8 w-full container m-auto text-primary-500 space-y-6">
          {sections.map((section:SectionType)=>
            <CategorySection key={section.id} id={section.id}/>
          )}
        </div>
      </div>
    </>
  )
}

export default App
