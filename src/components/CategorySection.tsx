import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard.tsx";

const CategorySection = (props: { id: number }) => {
    const { id } = props;
    const [sectionData,setSectionData] = useState<any>(null);
    const [products,setProducts] = useState<any>(null);

    const fetchSectionData = () => {
        axios.get(`http://localhost:3000/sections/${id}`,{withCredentials:true})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setSectionData(data[0]);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const fetchProducts = () => {
        axios.get(`http://localhost:3000/products`,{params: {categories: sectionData.categories, limit: 5}})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setProducts(data.products);
        })
        .catch((error)=>{
            console.error(`Error fetching products ->`,error);
        })
    }

    useEffect(()=>{
        fetchSectionData();
    },[]);

    useEffect(()=>{
        if(sectionData){
            fetchProducts();
        }
    },[sectionData]);


    return(
        <div className="space-y-2">
            {sectionData ? 
            <>
            <h3 className="text-primary-900 font-bold text-xl">{sectionData.name}</h3>
            <div className="grid grid-cols-2 xl:grid-cols-5 gap-2">
                {products?.map((product:any,key:number)=>
                    <ProductCard key={key} product={product}/>
                )}
            </div>
            </>:<></>}
        </div>
    )
}
export default CategorySection;