import { createContext, useState, ReactNode } from 'react';

interface OrdersContextType {
    userOrders: any[];
}

const OrdersContext = createContext<OrdersContextType>({
    userOrders: []
});

const OrdersProvider = ({ children }: { children: ReactNode}) => {

    const [userOrders] = useState<any>([]);


    return(
        <OrdersContext.Provider value={userOrders}>
            {children}
        </OrdersContext.Provider>
    )
}

export {OrdersProvider, OrdersContext}