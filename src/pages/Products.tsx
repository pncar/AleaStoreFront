import { useState,useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard.tsx";
import { useForm } from 'react-hook-form';

interface SearchParams {
    name: string | null;
    limit: number;
    offset: number;
    order: "l" | "o" | "pl" | "ph" | null;
}

const Products = () => {

    const [products,setProducts] = useState([]);
    const [categories,setCategories] = useState([]);
    const [totalProducts,setTotalProducts] = useState<number>(0);
    const [pages,setPages] = useState<number[]>([]);

    const [searchParams,setSearchParams] = useState({
        name: "",
        limit: 10,
        offset: 0,
        order: "l"
    });

    const fetchProducts = () => {
        const params = searchParams;
        axios.get(`http://localhost:3000/products`,{params})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setProducts(data.products);
            setTotalProducts(data.count[0].totalCount);
        })
        .catch((error)=>{
            console.error(`Error fetching products ->`,error);
        })
    }

    const fetchCategories = () => {
        axios.get(`http://localhost:3000/categories`)
        .then((response)=>{
            return response.data
        })
        .then((data)=>{
            setCategories(data);
        })
        .catch((error)=>{
            console.error(`Error fetching categories ->`,error);
        })
    }

    useEffect(()=>{
        fetchProducts();
        //fetchCategories();
    },[searchParams]);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(()=>{
        let items = [];
        if(totalProducts){
            for(let i=0;i<totalProducts/searchParams.limit;i++){
                items.push(i);
            }
            setPages(items);
        }
    },[totalProducts]);

    return(
        <div className="">
            <div className="min-h-screen container w-full lg:w-2/3 m-auto p-2 lg:p-8 space-y-2">
                <div className="">
                    <div className="space-y-2">
                        <div className="bg-white border border-primary-300 flex p-6">
                            <form className="w-full flex flex-col space-y-2 items-center">
                                <div className="w-full flex items-center h-10">
                                    <input {...register('search',{onChange: (e)=>{setSearchParams({...searchParams,name:e.target.value,offset:0});}})} type="text" className="h-full focus:outline-0 w-full p-2 px-4 rounded-l-md border border-primary-300"/>
                                    <button type="submit" className="bg-sky-600 h-full w-32 rounded-r-md text-primary-50 font-semibold cursor-pointer">Search</button>
                                </div>
                                <div className="w-full flex space-x-2">
                                    <div className="flex h-10 space-x-2">
                                        <input {...register('price-min')} type="number" placeholder={"Minimum"} className="h-full p-2 px-4 rounded-md border border-primary-300"/>
                                        <input {...register('price-max')} type="number" placeholder={"Maximum"} className="h-full p-2 px-4 rounded-md border border-primary-300"/>
                                        <button type="submit" className="h-full std-button bg-sky-600">Apply</button>
                                    </div>
                                    <div>
                                        <select {...register('order')} onChange={(e)=>{setSearchParams({...searchParams,order:e.target.value})}} className="h-10 border border-primary-300 rounded-md p-2 px-3">
                                            <option value={"l"}>Newest</option>
                                            <option value={"o"}>Oldest</option>
                                            <option value={"pl"}>Lowest Price</option>
                                            <option value={"ph"}>Highest Price</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {products.map((product:any,key:number)=>
                            <ProductCard product={product} key={key}/>
                        )}
                        </div>
                        <div className="space-x-2">
                            {totalProducts > 0 && pages.length > 1 && pages.map((page)=>
                                <button key={page} onClick={()=>{setSearchParams({...searchParams,offset:page * searchParams.limit})}} className={`std-button bg-sky-600 ${searchParams.offset / searchParams.limit === page ? "opacity-100" : "opacity-50"}`}>{page+1}</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Products;