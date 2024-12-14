import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import Admin from './admin/Admin.jsx'
import Employee from './employee/Employee.jsx'
import Header from './component/Header.jsx';
import A_login from './admin/A_login.jsx';
import A_signup from './admin/A_signup.jsx'
import E_login from './employee/E_login.jsx'
import E_signup from './employee/E_signup.jsx'
import Products from './component/Products.jsx'
import Uploadpdf from './component/Uploadpdf.jsx'
import Bydate from './component/Bydate.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<A_login />} />
        <Route path="/admin/signup" element={<A_signup />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/employee/signup" element={<E_signup />} />
        <Route path="/employee/login" element={<E_login />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/uploadpdf" element={<Uploadpdf/>} />
        <Route path="/bydate" element={<Bydate/>} />

      </Routes>
    </Router>
  </StrictMode>,
)
