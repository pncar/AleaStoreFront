import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";

interface GlobalContextType {
  user: any; 
  cart: any[] | null;
  addToCart: (item: string) => void;
  setUser: (user: any) => void;
  tryLogIn: (id?: string, email?: string, password?: string) => void;
  tryLogOut: () => void;
  getProtectedData: () => void;
}

const GlobalContext = createContext<GlobalContextType>({
  user: null,
  cart: null,
  addToCart: (item:string) => {},
  setUser: () => {},
  tryLogIn: (id?: string, email?: string, paswsord?: string) => {},
  tryLogOut: () => {},
  getProtectedData: () => {}
});

const GlobalProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUser] = useState<any>();
  const [cart, setCart] = useState<any>([]);

  const navigate = useNavigate();

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
    axios.post("http://localhost:3000/auth/fetchUser", null,  { withCredentials: true })
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

  return (
    <GlobalContext.Provider value={{ user, cart, addToCart, setUser, tryLogIn, tryLogOut, getProtectedData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };