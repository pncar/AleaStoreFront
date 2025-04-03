import { createContext, useState, useEffect, ReactNode } from 'react';
import api from "@/api/api.ts";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { faker }from "@faker-js/faker";
import _ from "lodash";

interface GlobalContextType {
  user: UserType|null|undefined; 
  cart: {q:number, productType: ProductType}[] | null;
  userOrders: OrderType[];
  totalPrice: number,
  totalPriceDiscounted: number,
  addToCart: (item: ProductType,qti?:number) => void;
  setUser: (user: UserType) => void;
  tryLogIn: (id?: string, email?: string, password?: string) => void;
  tryLogOut: () => void;
  //getProtectedData: () => void;
  clearCart: () => void;
  modifyItemInCart: (itemId: number, type: "increase" | "decrease") => void;
  fetchOrders: () => void;
  updateOrderStatus: (orderId: number, status: string) => void;
  storeInfo: StoreSettingsType | null
}

const GlobalContext = createContext<GlobalContextType>({
  user: null,
  cart: null,
  userOrders: [],
  totalPrice: 0,
  totalPriceDiscounted: 0,
  addToCart: (item:ProductType,qti?:number) => {},
  setUser: () => {},
  tryLogIn: (id?: string, email?: string, paswsord?: string) => {},
  tryLogOut: () => {},
  //getProtectedData: () => {},
  clearCart: () => {},
  modifyItemInCart: (itemId: number, type: "increase" | "decrease") => {},
  fetchOrders: () => {},
  updateOrderStatus: (orderId: number, status: string) => {},
  storeInfo: null
});

const GlobalProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<UserType|null>();
  const [cart, setCart] = useState<Array<{q: number, productType: ProductType}>>([]);
  const [userOrders, setUserOrders] = useState<OrderType[]>([]);
  const [totalPrice,setTotalPrice] = useState(0); // FLAG - Probably reworked
  const [totalPriceDiscounted,setTotalPriceDiscounted] = useState(0);

  const [storeInfo,setStoreInfo] = useState<StoreSettingsType|null>(null);

  const fetchStoreInfo = () => {
    api.get(`/store`)
    .then((response)=>{
      return response.data;
    })
    .then((data)=>{
      setStoreInfo(data);
    })
    .catch((error)=>{
      console.error(error);
    })
  }

  useEffect(()=>{
    fetchStoreInfo();
  },[]);

  const navigate = useNavigate();

  // --------------------- USERS -------------------------

  const login = async (id: string, email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { id, email, password });
      console.log(res.data);
    } catch (err) {
      console.error("Login failed", err);
    }
  }

  /* Currently not used
  const getProtectedData = async () => {
    try {
      const res = await api.get("/auth/protected");
      console.log(res.data);
    } catch (err) {
      console.error("Access denied", err);
    }
  }
  */

  const tryLogIn = async (id: string = "1" , email: string = "test@example.com" , password: string = "password" ) => {
    await login(id,email,password);
    navigate(0);
  }

  const tryLogOut = async () => {
    try{
        const res = await api.post(`/auth/logout`,null);
        console.log(res.data);
        navigate(0);
    }catch (err) {
        console.error("???",err);
    }
  } 

  const fetchUserData = async () => {
    api.post("/auth/fetch-user", null)
    .then((response)=>{
        if(response.status === 200){
            return response.data;
        }
        console.log(`Couldn't fetch data`);
        console.log(response);
        setUser(null);
    })
    .then((data)=>{
        if(data && data.user){
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

  const addToCart = (insert:ProductType, qti: number = 1) => {
    if(qti < 1 || qti > 99){
      console.error(`Trying to add invalid amount of items`);
      return;
    }
    const exists = cart.some((cartItem:{q: number, productType: ProductType}) => {return cartItem.productType.id === insert.id});
    if(!exists){
      setCart([...cart,{q: qti, productType:insert}]);
    }else{
      setCart(cart.map((cartItem:{q: number, productType: ProductType})=>{
        if(cartItem.productType.id === insert.id){
          return { ...cartItem, q: cartItem.q + qti };
        }
        else{
          return cartItem;
        }
      }));
    }
    Swal.fire({
      title: "Product added to Cart",
      icon: 'success',
      confirmButtonText: "Ok"
    })
  }

  const modifyItemInCart = (itemId: number, type: "increase" | "decrease" = "increase") => {
    const exists = cart.some((cartItem: {q: number, productType: ProductType}) => { return itemId === cartItem.productType.id });
    if(!exists){
      console.error("No item");
      return;
    }
    setCart(cart.map((cartItem:{q: number, productType: ProductType})=>{
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
      }//@ts-ignore
    ).filter((item:{q: number, productType: ProductType})=>{return item !== null}));
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
    if(user){
      api.get(`/orders/user/${user.id}`)
      .then((response)=>{
          return response.data;
      })
      .then((data)=>{
          //console.log(`/orders/user/${user.id}`);
          setUserOrders(data);
      })
      .catch((error)=>{
          console.error(`Error fetching orders ->`,error);
      })
    }
  }

  const updateOrderStatus = (orderId: number, status: string) => {
      api.patch(`/orders/${orderId}/`,{value: status})
      .then((response)=>{
          return response;
      })
      .then((data)=>{
          if(user){
            fetchOrders();
          }
      })
      .catch((error)=>{
          console.log(`Error updating order ->`,error);
      })
  }

  useEffect(()=>{
      let r = 0;
      let s = 0;
      cart?.map((item:{q: number, productType: ProductType})=>{
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
    <GlobalContext.Provider value={{ user, cart, userOrders, totalPrice, totalPriceDiscounted, addToCart, setUser, tryLogIn, tryLogOut, clearCart, modifyItemInCart, fetchOrders, updateOrderStatus, storeInfo }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };