import React from 'react';
import { Routes, Route} from "react-router-dom";
import Products from './products/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/Notfound'
import DetailProduct from './detailProduct/DetailProduct'
import { useContext} from "react";
import { GobalState } from "../../GobalState";
import OrderHistory from './history/OrderHistory';
import OrderDetails from './history/OrderDetails';
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';
const Page = () => {
  const state = useContext(GobalState);
  const [isLogged] = state.UserApi.isLogged;
  const [isAdmin] = state.UserApi.isAdmin;

  
  return (
    <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/details/:id" element={<DetailProduct />} />
        <Route path="/login" element={isLogged?<NotFound />:<Login />} />
        <Route path="/register" element={isLogged?<NotFound />:<Register />} />
        <Route path="/category" element={isAdmin?<Categories />:<Login />} />
        <Route path="/create_product" element={isAdmin?<CreateProduct />:<Login />} />
        <Route path="/edit_product/:id" element={isAdmin?<CreateProduct />:<Login />} />
        <Route path="/history" element={isLogged?<OrderHistory />:<Login />} />
        <Route path="/history/:id" element={isLogged?<OrderDetails />:<NotFound />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
};

export default Page;
// ctrl p
//copy file loi