import { useState, useEffect } from "react";
import CategorySection from "./components/CategorySection.tsx";
import api from "./api/api.ts";

const App = () => {

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
        <div className="bg-orange-400 bg-gradient-to-br from-indigo-900 via-blue-500 to-purple-300 h-64 text-primary-50 flex items-center justify-center">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">MyStore</h1>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="p-8 w-full container m-auto text-primary-500 space-y-6">
          {sections.map((section:any)=>
            <CategorySection key={section.id} id={section.id}/>
          )}
        </div>
      </div>
    </>
  )
}

export default App
