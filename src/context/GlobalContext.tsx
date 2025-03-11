import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";

interface GlobalContextType {
  user: any; 
  cart: any[] | null;
  userOrders: any[];
  totalPrice: number,
  totalPriceDiscounted: number,
  addToCart: (item: string) => void;
  setUser: (user: any) => void;
  tryLogIn: (id?: string, email?: string, password?: string) => void;
  tryLogOut: () => void;
  getProtectedData: () => void;
  clearCart: () => void;
  modifyItemInCart: (itemId: number, type: "increase" | "decrease") => void;
  fetchOrders: () => void;
  updateOrderStatus: (orderId: number, status: string) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  user: null,
  cart: null,
  userOrders: [],
  totalPrice: 0,
  totalPriceDiscounted: 0,
  addToCart: (item:string) => {},
  setUser: () => {},
  tryLogIn: (id?: string, email?: string, paswsord?: string) => {},
  tryLogOut: () => {},
  getProtectedData: () => {},
  clearCart: () => {},
  modifyItemInCart: (itemId: number, type: "increase" | "decrease") => {},
  fetchOrders: () => {},
  updateOrderStatus: (orderId: number, status: string) => {}
});

const GlobalProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<any>();
  const [cart, setCart] = useState<any>([]);
  const [userOrders, setUserOrders] = useState<any>([]);
  const [totalPrice,setTotalPrice] = useState(0); // FLAG - Probably reworked
  const [totalPriceDiscounted,setTotalPriceDiscounted] = useState(0);

  const navigate = useNavigate();

  // --------------------- USERS -------------------------

  const login = async (id: string, email: string, password: string) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", { id, email, password }, { withCredentials: true });
      console.log(res.data);
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  const getProtectedData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/protected", { withCredentials: true });
      console.log(res.data);
    } catch (err) {
      console.error("Access denied", err);
    }
  }

  const tryLogIn = async (id: string = "1" , email: string = "test@example.com" , password: string = "password" ) => {
    await login(id,email,password);
    navigate(0);
  }

  const tryLogOut = async () => {
    try{
        const res = await axios.post(`http://localhost:3000/auth/logout`,null,{withCredentials: true});
        console.log(res.data);
        navigate(0);
    }catch (err) {
        console.error("???",err);
    }
  } 

  const fetchUserData = async () => {
    axios.post("http://localhost:3000/auth/fetch-user", null,  { withCredentials: true })
    .then((response)=>{
        if(response.status === 200){
            return response.data;
        }
        console.log(`Couldn't fetch data`);
        console.log(response);
        setUser(null);
    })
    .then((data)=>{
        if(data){
            console.log(data);
            setUser(data.user);
        }
    })
    .catch((error)=>{
        //console.error(error);
    })
}

  useEffect(()=>{
      fetchUserData();
  },[]);

  // --------------------- CART -------------------------

  const addToCart = (insert:any) => {
    const exists = cart.some((cartItem:any) => {return cartItem.productType.id === insert.id});
    if(!exists){
      setCart([...cart,{q: 1, productType:insert}]);
    }else{
      setCart(cart.map((cartItem:any)=>{
        if(cartItem.productType.id === insert.id){
          return { ...cartItem, q: cartItem.q + 1 };
        }
        else{
          console.log("b");
          return cartItem;
        }
      }));
    }
  }

  const modifyItemInCart = (itemId: number, type: "increase" | "decrease" = "increase") => {
    const exists = cart.some((cartItem: any) => { return itemId === cartItem.productType.id });
    if(!exists){
      console.error("No item");
      return;
    }
    setCart(cart.map((cartItem:any)=>{
        if(cartItem.productType.id === itemId){
          if(type === "decrease"){
            if(cartItem.q >= 2){
              return {...cartItem, q: cartItem.q -1 }
            }return null;
          }else{
            return {...cartItem, q: cartItem.q +1}
          }
        }
        return cartItem;
      }
    ).filter((item:any)=>{return item !== null}));
  }

  const clearCart = () => {
    setCart([]);
    localStorage.setItem('cart',JSON.stringify([]));
  }

  useEffect(()=>{
    if(localStorage.getItem('cart')){
      setCart(JSON.parse((localStorage.getItem('cart') as string)));
    }
  },[]);

  useEffect(()=>{
    if(cart && cart.length > 0){
      localStorage.setItem('cart',JSON.stringify(cart));
    }
  },[cart]);

  // --------------------- ORDERS -------------------------

  const fetchOrders = () => {
    axios.get(`http://localhost:3000/orders/user/${user.id}`, {withCredentials: true})
    .then((response)=>{
        return response.data;
    })
    .then((data)=>{
        console.log(`http://localhost:3000/orders/user/${user.id}`);
        setUserOrders(data);
    })
    .catch((error)=>{
        console.error(`Error fetching orders ->`,error);
    })
  }

  const updateOrderStatus = (orderId: number, status: string) => {
      axios.post(`http://localhost:3000/orders/${orderId}/update-status`,{value: status}, {withCredentials: true})
      .then((response)=>{
          return response;
      })
      .then((data)=>{
          console.log(data);
          fetchOrders();
      })
      .catch((error)=>{
          console.log(`Error updating order ->`,error);
      })
  }

  useEffect(()=>{
      let r = 0;
      let s = 0;
      cart?.map((item:any)=>{
          r += item.q * item.productType.price;
          s += item.q * item.productType.discounted_price;
      });
      setTotalPrice(r);
      setTotalPriceDiscounted(s);
  },[cart]);

  useEffect(()=>{
      user && fetchOrders();
  },[user]);

  return (
    <GlobalContext.Provider value={{ user, cart, userOrders, totalPrice, totalPriceDiscounted, addToCart, setUser, tryLogIn, tryLogOut, getProtectedData, clearCart, modifyItemInCart, fetchOrders, updateOrderStatus }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };