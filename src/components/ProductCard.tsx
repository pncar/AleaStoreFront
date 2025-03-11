import { Link } from "react-router";
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.tsx";
import Price from "../components/Price.tsx";

const ProductCard = (props: {product: any}) => {
    const { product } = props;
    const { cart, addToCart } = useContext(GlobalContext);
    const [inCart,setInCart] = useState(0);

    useEffect(()=>{
        if(cart){
            cart.map((cartItem:any)=>{
                if(cartItem.productType.id === product.id){
                    setInCart(cartItem.q);
                }
            })
        }
    },[cart]);

    return(
        <div className="border border-primary-300 shadow-md bg-white min-h-full">
            <Link to={`/product/${product.id}`} className="relative overflow-hidden group block">
                <img className="transition-all duration-[0.5s] scale-100 group-hover:scale-110 w-full h-64 object-cover" src={
                    product.image ? `http://localhost:3000/uploads/${product.image}` 
                    : `https://www.svgrepo.com/show/508699/landscape-placeholder.svg`}/>
            </Link>
            <div className="p-4 space-y-2">
                <p className="h-12">{product.name}</p>
                <Price price={product.price} rate={product.discount_rate} total={product.discounted_price}/>
                <div>
                    <button onClick={()=>{addToCart(product)}} className="std-button bg-sky-600">Add to Cart ({inCart})</button>
                </div>
            </div>
        </div>
    )
}
export default ProductCard;