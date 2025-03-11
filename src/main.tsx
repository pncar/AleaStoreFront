import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { GlobalProvider } from './context/GlobalContext';
import AdminRoute from "./components/AdminRoute.tsx";
import Layout from "./components/Layout.tsx";
//import { OrdersProvider } from "./context/OrdersContext";
import './index.css'
import App from './App.tsx'
import Users from "./pages/Users.tsx";
import Products from "./pages/Products.tsx";
import LogIn from "./pages/LogIn.tsx";
import SignUp from "./pages/SignUp.tsx";
//import Publish from "./pages/Publish.tsx";
import Product from "./pages/Product.tsx";
import Profile from "./pages/Profile.tsx";
import Cart from "./pages/Cart.tsx";
import Orders from "./pages/Orders.tsx";
import Dashboard from "./pages/Dashboard.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <GlobalProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/users" element={<AdminRoute><Users/></AdminRoute>}/>
              <Route path="/products" element={<Products/>}/>
              <Route path="/login" element={<LogIn/>}/>
              <Route path="/sign-up" element={<SignUp/>}/>
              {/*<Route path="/publish" element={<AdminRoute><Publish/></AdminRoute>}/>*/}
              <Route path="/product/:id" element={<Product/>}/>
              <Route path="/profile/:id?" element={<Profile/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/orders" element={<Orders/>}/>
              <Route path="/dashboard/*" element={<AdminRoute><Dashboard/></AdminRoute>}/>
            </Routes>
          </Layout>
        </GlobalProvider>
      </BrowserRouter>
  </StrictMode>
)
