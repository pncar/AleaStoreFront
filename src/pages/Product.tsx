import axios from "axios";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import { Link, useNavigate } from "react-router";
import Swal from 'sweetalert2';
import Price from "../components/Price.tsx";

const Product = () => {

    const { user, addToCart } = useContext(GlobalContext);

    const [product,setProduct] = useState<any|null>(null);
    const [productDiscounts,setProductDiscounts] = useState<any|null>([]);

    const { id } = useParams();

    const navigate = useNavigate();

    const fetchProduct = () => {
        axios.get(`http://localhost:3000/products/${id}`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            console.log(data);
            setProduct(data[0]);
        })
        .catch((error)=>{
            console.error(`Error fetching product with id ${id}`,error);
        })
    }

    const fetchDiscounts = (productId:number) => {
        axios.get(`http://localhost:3000/discounts/product/${product.id}`,{withCredentials:true})
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setProductDiscounts(data);
        })
        .catch((error)=>{
            console.error(`Error fetching discounts for product ${product.id}`);
        })
    }

    const onDelete = (id:number) => {
        axios.post(`http://localhost:3000/products/${id}/delete`,{id},{withCredentials: true})
        .then((response)=>{
            return response.data
        })
        .then(()=>{
            Swal.fire({
                title: 'Unpublished',
                text: 'Product was successfully deleted.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            navigate("/products");
        })
        .catch((error)=>{
            console.error(`Error deleting product`,error);
        })
    }

    useEffect(()=>{
        fetchProduct();
    },[]);

    useEffect(()=>{
        if(product){
            fetchDiscounts(product.id);
        }
    },[product]);

    return(
        <div>
        <div className="container w-full m-auto flex justify-center my-8">
            <div className="w-full md:w-2/3 bg-white rounded-md p-8 shadow-lg border border-primary-300">
                <div>
                    {product ? 
                    <div className="space-y-2">
                        <div className="p-1 space-x-2">
                            <button onClick={()=>{navigate(-1)}} className="bg-primary-900 text-primary-50 text-xs p-2 px-4 rounded-md cursor-pointer">Go Back</button>
                        </div>
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:p-4">
                                <img src={product.image ? `http://localhost:3000/uploads/${product.image}` : `https://www.svgrepo.com/show/508699/landscape-placeholder.svg`} className="object-cover w-full h-120"/>
                            </div>
                            <div className="w-full md:p-4">
                                <div className="space-y-3">
                                    <h3 className="font-bold text-xl">{product.name}</h3>
                                    <Price rate={product.discount_rate} total={product.discounted_price} price={product.price}/>
                                    <p className="text-sm text-primary-700 leading-6">{product.description}</p>
                                    <div className="space-x-2">
                                        {user && user.id != product.user_id && <button onClick={()=>{addToCart(product)}} className="std-button bg-sky-600">Add to Cart</button>}
                                        <button onClick={()=>{onDelete(product.id)}} className="bg-red-600 text-primary-50 rounded-md p-2 px-4 text-xs font-semibold uppercase tracking-widest cursor-pointer">Delete</button>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2">
                                        {productDiscounts?.map((discount:any)=>
                                        <div key={discount.id} className="flex items-center justify-center p-2 px-3 bg-green-600 text-green-50 font-semibold rounded-md">
                                            <div className="text-center"><p>{discount.rate}%</p><p className="text-xs">{discount.name}</p></div>
                                        </div>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :<>No Prodcut</>}
                </div>
            </div>
        </div>
    </div>
    )
}
export default Product;