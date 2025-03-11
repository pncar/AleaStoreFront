import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";

interface OrdersContextType {
    userOrders: any[];
}

const OrdersContext = createContext<OrdersContextType>({
    userOrders: []
});

const OrdersProvider = ({ children }: { children: ReactNode}) => {

    const [userOrders,setUserOrders] = useState<any>([]);


    return(
        <OrdersContext.Provider value={userOrders}>
            {children}
        </OrdersContext.Provider>
    )
}

export {OrdersProvider, OrdersContext}