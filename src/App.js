import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./page/Login/Login" ;
import Dashboard from "./page/Dashboard/Dashboard" ;
import DataArtikel from "./page/DataArtikel/DataArtikel";
import { SideBar } from "./component/SideBar/SideBar";
import Network from "./page/error/Network";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function App() {
 
   
      return (
        <BrowserRouter>
          <Routes>
     
         <Route path="/" element={<Login />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<DashboardWithSideBar/>}/>
            <Route path="/dataartikel/*" element={<DataArtikelWithSideBar />} />
            <Route path="/networkErr" element={<Network />} />

         
          </Routes>
        </BrowserRouter>
      );
     
 }
 function DashboardWithSideBar() {
  return (
    <SideBar>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* other routes for dashboard */}
      </Routes>
    </SideBar>
  );
}
function DataArtikelWithSideBar() {
  return (
    <SideBar>
      <Routes>
        <Route path="/" element={<DataArtikel />} />
        {/* other routes for data artikel */}
      </Routes>
    </SideBar>
  );
}
