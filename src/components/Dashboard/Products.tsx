import { useState, useEffect } from "react";
import api from "@/api/api.ts";
import { Link } from "react-router";
import Publish from "../../components/Publish.tsx"; // Temporarily set it like this

const Products = () => {

    const [products,setProducts] = useState([]);

    const fetchProducts = () => {
        api.get(`/products`)
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
        fetchProducts();
    },[]);

    const handlePublish = () => {
        fetchProducts();
    }

    return(
        <div>
            <div className="std-panel">
                <Publish onHandlePublish={handlePublish}/>
                <table className="std-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Img</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Discounted Price</th>
                            <th>Discount Rate</th>
                            <th>Commands</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 && products.map((product:ProductType)=>
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td><img className="w-full h-24 object-cover" src={product.image ? `http://localhost:3000/uploads/${product.image}` : `https://www.svgrepo.com/show/508699/landscape-placeholder.svg`}/></td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>${product.discounted_price}</td>
                                <td>{product.discount_rate}%</td>
                                <td className="space-x-2">
                                    <Link to={`/product/${product.id}`} className="std-button bg-primary-600">View</Link>
                                    <Link to={`/dashboard/products/edit/${product.id}`} className="std-button bg-sky-600">Edit</Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Products;