import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link, Outlet } from "react-router-dom";
import '../admin/Admin.scss'

export default function E_signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('');
    const [email,setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('');
    const localhost= 'http://localhost:10000'
    const api='https://admin-gy1z.onrender.com'

    useEffect(()=>{      
        if(!localStorage.getItem('gstar_admin')){
            navigate('/admin/login')
        }
        getprofile();
    },[])
// -----admin verification-------
    const getprofile=async()=>{
        let token= localStorage.getItem('gstar_admin');
       try{
        let admin= await fetch(`${api}/admin/getprofile`,{
            method:'GET',
            headers:{'Authorization':`Bearer ${token}`}
        });
        admin= await admin.json();
        if(admin.admin.mobile=== undefined){
           navigate('/admin/login')
        }}catch(err){
           alert('Please Login first as admin')
            navigate('/admin/login')
        }
 }

    const handleFormSubmit = async (e) => {
       if(name && mobile && password){
        setLoading(true)
        e.preventDefault();
        try {
            let result = await fetch(`${api}/employee/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, mobile, email, password })
            })
            result = await result.json();
            if (result.status) {
                alert('Employee successfully signed up');
                navigate("/employee/login");
            }
            setLoading(false);
            return;
        } catch (err) {
            setLoading(false)
            console.log(err);
            alert("Error while signing up")
        }
       }else{
        alert("Please fill all details");
        return;
       }
    }
    return (
        <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null, minHeight: '100vh', backgroundColor: '#28b6f6' }} className="d-flex justify-content-center align-items-center">
            {loading && ( 
                       <div className="spinner">
                           <Spinner animation="border" variant="primary" />
                       </div>
                   )}
            <div className="form-container mt-4">
                <Form className="register-form" onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Bhagat Singh" onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="number" placeholder="9999999999" onChange={(e) => setMobile(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="abc@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="*******" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <button className="form-field" type="submit"> Register </button>
                </Form>
            </div>
            <Outlet />
        </div>

    );
}
