import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "./page/Login/Login" ;
import Dashboard from "./page/Dashboard/Dashboard" ;
export default function App() {
 
   
      return (
        <BrowserRouter>
          <Routes>
           
         <Route path="/" element={<Login />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          

          </Routes>
        </BrowserRouter>
      );
     
 }