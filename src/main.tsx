import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { GlobalProvider } from './context/GlobalContext';
import RoleRoute from "./components/RoleRoute.tsx";
import Layout from "./components/Layout.tsx";
//import { OrdersProvider } from "./context/OrdersContext";
import './index.css'
import App from './App.tsx'
import Users from "./pages/Users.tsx";
import Products from "./pages/Products.tsx";
import LogIn from "./pages/LogIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Product from "./pages/Product.tsx";
import Profile from "./pages/Profile.tsx";
import Cart from "./pages/Cart.tsx";
import Orders from "./pages/Orders.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import TermsConditions from './pages/TermsConditions.tsx';
import FAQ from './pages/FAQ.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <GlobalProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/products" element={<Products/>}/>
              <Route path="/products/category/:categoryId?" element={<Products/>}/>
              <Route path="/login" element={<LogIn/>}/>
              <Route path="/sign-up" element={<SignUp/>}/>
              <Route path="/product/:id" element={<Product/>}/>
              <Route path="/profile/:id?" element={<RoleRoute roles={["user","admin"]}><Profile/></RoleRoute>}/>
              <Route path="/cart" element={<RoleRoute roles={["user","admin"]}><Cart/></RoleRoute>}/>
              <Route path="/orders" element={<Orders/>}/>
              <Route path="/dashboard/*" element={<RoleRoute roles={["admin"]}><Dashboard/></RoleRoute>}/>
              <Route path="/terms_and_conditions" element={<TermsConditions/>}/>
              <Route path="/faq" element={<FAQ/>}/>
            </Routes>
          </Layout>
        </GlobalProvider>
      </BrowserRouter>
  </StrictMode>
)
