import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scheduling" element={<Dashboard />} />
        <Route path="/services" element = {<Services/>} />
        <Route path="/blog" element = {<Blog/>} />
        <Route path="/contact" element={<Contact/>}/>
        
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;