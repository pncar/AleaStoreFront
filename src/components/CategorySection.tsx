import { useState, useEffect } from "react";
import api from "@/api/api.ts";
import ProductCard from "../components/ProductCard.tsx";

const CategorySection = (props: { id: number, q?: number }) => {
    const { id, q = 5 } = props;
    const [sectionData,setSectionData] = useState<SectionType|null>(null);
    const [products,setProducts] = useState<ProductType[]>([]);

    const fetchSectionData = () => {
        api.get(`/sections/${id}`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setSectionData(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const fetchProducts = () => {
        api.get(`/products`,{params: {categories: sectionData?.categories, limit: q}})
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
            <div className={`grid gap-2`} style={{gridTemplateColumns: `repeat(${window.innerWidth > 1024 ? q : 2}, minmax(0, 1fr))`}}>
                {products?.map((product:ProductType,key:number)=>
                    <ProductCard key={key} product={product}/>
                )}
            </div>
            </>:<></>}
        </div>
    )
}
export default CategorySection;