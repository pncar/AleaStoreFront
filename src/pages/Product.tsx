import api from "@/api/api.ts";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from 'react-router';
import Price from "../components/Price.tsx";
import parse from 'html-react-parser';
import CategorySection from "@/components/CategorySection.tsx";
import { FaChevronLeft } from "react-icons/fa";

const Product = () => {

    const { user, cart, addToCart } = useContext(GlobalContext);

    const [product,setProduct] = useState<ProductType|null>(null);
    const [productDiscounts,setProductDiscounts] = useState<DiscountType[]>([]);
    const [inCart,setInCart] = useState(0);

    const [addQ,setAddQ] = useState<number>(1);

    const { id } = useParams();

    const navigate = useNavigate();

    const fetchProduct = () => {
        api.get(`/products/${id}`)
        .then((response)=>{
            return response.data;
        })
        .then((data)=>{
            setProduct(data);
        })
        .catch((error)=>{
            console.error(`Error fetching product with id ${id}`,error);
        })
    }

    const fetchDiscounts = (productId:number) => {
        if(product){
            api.get(`/discounts/product/${product.id}`)
            .then((response)=>{
                return response.data;
            })
            .then((data)=>{
                setProductDiscounts(data);
            })
            .catch((error)=>{
                console.error(`Error fetching discounts for product ${product.id}`);
            })
        }else{
            console.log(`Couldn't get product`);
        }
    }

    useEffect(()=>{
        fetchProduct();
        window.scrollTo(0, 0);
    },[id]);

    useEffect(()=>{
        if(product){
            fetchDiscounts(product.id);
        }
    },[product]);

    useEffect(()=>{
        if(cart && product){
            cart.map((cartItem:{q:number,productType:ProductType})=>{
                if(cartItem.productType.id === product.id){
                    setInCart(cartItem.q);
                }
            })
        }
    },[product,cart]);

    return(
        <div>
        <div className="container w-full m-auto flex-col justify-center 2xl:my-8">
            <div className="w-full 2xl:w-2/3 m-auto bg-white rounded-md p-4 shadow-lg border border-primary-300">
                <div>
                    {product ? 
                    <>
                    <div className="space-y-2">
                        <div className="p-1 space-x-2 flex items-center">
                            <FaChevronLeft onClick={()=>{navigate(-1)}} className="cursor-pointer"/>
                            <Link to={`/products/category/${product.category_id}`} className="text-sky-600">{product.category}</Link>
                        </div>
                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
                            <div className="w-full md:p-4">
                                <img src={product.image ? `http://localhost:3000/uploads/${product.image}` : `https://www.svgrepo.com/show/508699/landscape-placeholder.svg`} className="object-cover w-full h-120"/>
                            </div>
                            <div className="w-full md:p-4">
                                <div className="space-y-3">
                                    <h3 className="font-semibold text-3xl">{product.name}</h3>
                                    <Price rate={product.discount_rate} total={product.discounted_price} price={product.price}/>
                                    <div className="">
                                        <div className="flex text-primary-50 w-40">
                                            <div className="rounded-tl-md flex items-center justify-center p-3 bg-primary-900 cursor-pointer" onClick={()=>{addQ > 1 && setAddQ(addQ - 1)}}>-</div>
                                            <div className="w-40 flex items-center justify-center p-3 bg-primary-800">{addQ}</div>
                                            <div className="rounded-tr-md flex items-center justify-center p-3 bg-primary-900 cursor-pointer" onClick={()=>{addQ < 100 && setAddQ(addQ +1)}}>+</div>
                                        </div>
                                        <div onClick={()=>{addToCart(product,addQ)}} className="text-xs rounded-b-md text-primary-50 flex items-center justify-center p-2 w-40 cursor-pointer bg-sky-600">
                                            Add to Cart {inCart}
                                        </div>
                                    </div>
                                    <div>
                                        <Link to="/cart" className="text-sm text-sky-600">Go to Cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:p-4 std-description-section">
                            <div className="text-sm text-primary-700 leading-6">
                                {parse(product.description)}
                            </div>
                        </div>
                    </div>
                    </>
                    :<>No Prodcut</>}
                </div>
            </div>
            <div className="xl:w-2/3 m-auto py-6 px-2 mdx:p-0">
                <CategorySection id={12} q={4}/>
            </div>
        </div>
    </div>
    )
}
export default Product;