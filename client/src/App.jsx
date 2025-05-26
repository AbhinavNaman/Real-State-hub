import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import PropertyDetail from './pages/PropertyDetail';

import React from 'react'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className="m-5 mx-24">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/property/:id" element={<PropertyDetail />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
