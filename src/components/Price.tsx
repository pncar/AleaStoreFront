const Price = (props:{rate: number, price: number, total: number}) => {
    const { rate, total, price } = props;
    return(
        <div className="h-12">
            {rate > 0 ? 
            <div className="space-x-2">
            <p className={`text-lg font-bold`}>${total}</p>
            <p className={`text-lg font-normal text-primary-600 space-x-2 text-sm`}><span className="line-through">${price}</span><span className="uppercase no-underline font-semibold text-green-600 text-sm">{rate}% Off</span></p>
            </div>
            : <p className={`text-lg font-bold`}>${price}</p>
            }
        </div>
    )
}
export default Price;