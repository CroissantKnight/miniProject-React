import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
// import "./App.css";
import Layout from "./Layout/Layuot";
import LoginTest from "./pages/LoginTest";
import TestP from "./pages/TestP";
import AdminP from "./pages/AdminP";
import UserP from "./pages/UserP";
import T_admin from "./pages/T_admin";
import T_user from "./pages/T_user";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./pages/styles.css";

function App() {
  return (
    <>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/testp" element={<TestP />} />
        <Route path="/" element={<Layout />}>
          <Route path="/Tuser" element={<T_user />} />
          <Route path="/Tadmin" element={<T_admin />} />
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/login" element={<LoginTest />} />
        <Route path="/AdminP" element={<AdminP />} />
        <Route path="/UserP" element={<UserP />} />
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
