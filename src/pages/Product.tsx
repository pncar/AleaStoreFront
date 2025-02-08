import axios from "axios";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useState, useEffect } from "react";
import { useParams } from 'react-router';
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router";
import Swal from 'sweetalert2';

const Product = () => {

    const { user, addToCart } = useContext(GlobalContext);

    const [product,setProduct] = useState<any|null>(null);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(()=>{
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
    },[]);

    const onDelete = (id:number) => {
        axios.post(`http://localhost:3000/products/${id}/delete`,{id})
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

    return(
        <div>
        <Navbar/>
        <div className="container w-full m-auto flex justify-center my-8">
            <div className="w-full md:w-2/3 bg-white rounded-md p-8 shadow-lg border border-primary-300">
                <div>
                    {product ? 
                    <div>
                        <div className="p-1 space-x-2">
                            <button onClick={()=>{navigate(-1)}} className="bg-primary-900 text-primary-50 text-xs p-2 px-4 rounded-md cursor-pointer">Go Back</button>
                        </div>
                        <div className="flex">
                            <div className="w-full p-4">
                                <img src={`https://www.svgrepo.com/show/508699/landscape-placeholder.svg`}/>
                            </div>
                            <div className="w-full p-4">
                                <div className="space-y-2">
                                    <h3 className="font-bold text-xl">{product.name}</h3>
                                    <p className="text-lg font-bold">${product.price}</p>
                                    <p>{product.description}</p>
                                    <Link to={`/profile/${product.user_id}`} className="block p-2 px-3 rounded-md bg-primary-300"><p>@{product.user}</p></Link>
                                    <div className="space-x-2">
                                        {user && user.id != product.user_id && <button onClick={()=>{addToCart(product)}} className="std-button bg-sky-600">Add to Cart</button>}
                                        <button onClick={()=>{onDelete(product.id)}} className="bg-red-600 text-primary-50 rounded-md p-2 px-4 text-xs font-semibold uppercase tracking-widest cursor-pointer">Delete</button>
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