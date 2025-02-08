import { Link } from "react-router";
const ProductCard = (props: {product: any}) => {
    const { product } = props;
    return(
        <div className="border border-primary-300 p-4 shadow-md bg-white min-h-full">
            <img src={`https://www.svgrepo.com/show/508699/landscape-placeholder.svg`}/>
            <p>{product.name}</p>
            <p>${product.price}</p>
            <Link to={`/profile/${product.user_id}`}><p className="text-sm font-semibold text-primary-500">@{product.user}</p></Link>
        </div>
    )
}
export default ProductCard;