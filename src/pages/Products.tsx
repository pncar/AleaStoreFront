import { useState,useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.tsx";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard.tsx";
const Products = () => {

    const [products,setProducts] = useState([]);

    const fetchProducts = () => {
        axios.get(`http://localhost:3000/products`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setProducts(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        fetchProducts();
    },[]);

    return(
        <div className="bg-primary-300">
            <Navbar/>
            <div className="container w-full lg:w-2/3 m-auto p-2 lg:p-8">
                <h2 className="font-bold text-2xl py-3">List of Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {products.map((product:any,key:number)=>
                    <Link to={`/product/${product.id}`} key={key}>
                        <ProductCard product={product}/>
                    </Link>
                )}
                </div>
            </div>
        </div>
    )
}
export default Products;