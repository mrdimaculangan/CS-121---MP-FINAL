import React, {useState} from "react";
import { Routes, Route, Navigate } from 'react-router-dom'; 
import './App.css';

import Login from "./components/pages/buyer/login";
import ProfileInformation from "./components/pages/buyer/profileinformation";
import ItemDescription from "./components/pages/buyer/itemdescription";
import MyCart from "./components/pages/buyer/cart";
import StoreEdit from "./components/pages/seller/storeedit";
import Home from "./components/pages/buyer/home"
import Shop from "./components/pages/buyer/shop"
import { CartProvider } from "react-use-cart";

const App = () => {
  return (
    <CartProvider>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profileinformation" element={<ProfileInformation />} />
      <Route path="/itemdescription" element={<ItemDescription />} />
      <Route path="/storeedit" element={<StoreEdit />} />
      <Route path="/cart" element={<MyCart />} />
      <Route path ="/shop" element={<Shop />} />
      <Route path="/itemdescription/:id" element={<ItemDescription />} />
    </Routes>
    </CartProvider>
  );
};

export default App;
