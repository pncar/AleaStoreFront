import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { GlobalProvider } from './context/GlobalContext';
import './index.css'
import App from './App.tsx'
import Users from "./pages/Users.tsx";
import Products from "./pages/Products.tsx";
import LogIn from "./pages/LogIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Publish from "./pages/Publish.tsx";
import Product from "./pages/Product.tsx";
import Profile from "./pages/Profile.tsx";
import Cart from "./pages/Cart.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <GlobalProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/users" element={<Users />}/>
            <Route path="/products" element={<Products />}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/publish" element={<Publish/>}/>
            <Route path="/product/:id" element={<Product/>}/>
            <Route path="/profile/:id?" element={<Profile/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
        </GlobalProvider>
      </BrowserRouter>
  </StrictMode>
)
