import { ReactNode, useState, useRef } from "react";
const TableRow = ({children, order}:{children: ReactNode, order: OrderType}) => {

    const tableRef = useRef(null);
    const [selected,setSelected] = useState<boolean>(false);
    
    const test = () => {
        if(tableRef.current){
            console.log(order);
            setSelected(!selected);
        }
    }

    return(
        <tr ref={tableRef} onClick={test} className={`${selected ? `bg-sky-100` : `` }`}>
            {children}
        </tr>
    )
}
export default TableRow;