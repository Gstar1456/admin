import React, { useEffect, useState } from "react";
import {Link, Outlet, useNavigate} from 'react-router-dom'

export default function Admin(){
    const localhost= 'http://localhost:10000'
    const api='https://admin-gy1z.onrender.com'

    const navigate= useNavigate();
    const [profile,setProfile]=useState({})

    useEffect(()=>{      
        getprofile();
    },[])

    const getprofile=async()=>{
        let token= localStorage.getItem('gstar_admin');
       try{
        let admin= await fetch(`${localhost}/admin/getprofile`,{
            method:'GET',
            headers:{'Authorization':`Bearer ${token}`}
        });
        admin= await admin.json();
        if(admin.admin.mobile!== undefined){
            setProfile(admin.admin);
        }else{
            navigate('/admin/login')
        }
       }catch(err){
        navigate('/admin/login')
       }
    }

    return(
        <div className="ps-4 pe-4">
        <h1>Hello {profile.name}</h1>
        <Link to='/employee/signup'>Add Employee</Link>
        <Outlet/>
        </div>
    )
}