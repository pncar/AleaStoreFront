import { useState,useEffect } from "react";
import api from "@/api/api.ts";
import ProductCard from "../components/ProductCard.tsx";
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useParams, useNavigate } from "react-router";


const Products = () => {

    const [products,setProducts] = useState([]);
    const [categories,setCategories] = useState([]);
    const [totalProducts,setTotalProducts] = useState<number>(0);
    const [pages,setPages] = useState<number[]>([]);

    const { categoryId } = useParams();
    const navigate = useNavigate();

    console.log(categoryId);

    type SearchParamType = {
        subject: string;
        limit: number;
        offset: number;
        order: string;
        price_lt: string;
        price_gt: string;
        categories: string[] | number[]
    }

    const initialState = {
        subject: "",
        limit: 10,
        offset: 0,
        order: "l",
        price_lt: "",
        price_gt: "",
        categories: []
    };

    const [searchParams,setSearchParams] = useState<SearchParamType>(initialState);

    const fetchProducts = () => {
        const params = searchParams;
        api.get(`/products`,{params})
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
        api.get(`/categories`)
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

    const updateParams:SubmitHandler<FieldValues> = (data) => {
        const { subject, min, max, order, categories } = data;
        setSearchParams({...searchParams,subject, order, offset: 0, price_gt: min, price_lt: max, categories: [categories]});
    }

    useEffect(()=>{
        fetchCategories();
    },[]);

    useEffect(()=>{
        fetchProducts();
        if(categoryId && searchParams.categories.length > 0 && !(searchParams.categories as string[]).includes(categoryId)){
            navigate(`/products/`);
        }
    },[searchParams]);

    useEffect(()=>{
        if(categoryId){
            setSearchParams({...searchParams,categories: [categoryId]});
        }else{
            setSearchParams(initialState);
        }
    },[categoryId]);

    /* 
    Currently not using this real-time thing
    useEffect(()=>{
        fetchProducts();
    },[searchParams]);
    */


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
            <div className="min-h-screen container w-full 2xl:w-2/3 m-auto p-2 lg:p-8 space-y-2">
                <div className="">
                    <div className="space-y-2">
                        <div className="bg-white border border-primary-300 flex p-6">
                            <form onSubmit={handleSubmit(updateParams)} className="w-full flex flex-col space-y-2 items-center">
                                <div className="w-full flex items-center h-10">
                                    <input {...register('subject')} type="text" className="h-full focus:outline-0 w-full p-2 px-4 rounded-md border border-primary-300"/>
                                </div>
                                <div className="w-full flex space-x-2">
                                    <div className="flex h-10 space-x-2">
                                        <input {...register('min')} type="number" min={0} placeholder={"Minimum"} className="h-full p-2 px-4 rounded-md border border-primary-300"/>
                                        <input {...register('max')} type="number" min={0} placeholder={"Maximum"} className="h-full p-2 px-4 rounded-md border border-primary-300"/>
                                    </div>
                                    <div>
                                        <select {...register('order')} className="h-10 border border-primary-300 rounded-md p-2 px-3">
                                            <option value={"l"}>Newest</option>
                                            <option value={"o"}>Oldest</option>
                                            <option value={"pl"}>Lowest Price</option>
                                            <option value={"ph"}>Highest Price</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select {...register('categories')} className="h-10 border border-primary-300 rounded-md p-2 px-3">
                                            <option value={0}>All</option>
                                            {
                                                categories.map((category:CategoryType)=>
                                                    <option key={category.id} value={category.id}>{category.name}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <button type="submit" className="bg-sky-600 h-full w-32 rounded-md p-2 text-primary-50 font-semibold cursor-pointer">Search</button>
                                </div>
                            </form>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {products.map((product:ProductType,key:number)=>
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