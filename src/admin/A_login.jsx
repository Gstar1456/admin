import { useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import './Admin.scss'

export default function A_login(){
    const [loading,setLoading]= useState(false)
    const [amobile,setMobile]=useState('');
    const [apassword,setPassword]=useState('');
    const navigate= useNavigate();
    const localhost= 'http://localhost:10000'
    const api='https://admin-gy1z.onrender.com'

    const handleadminLogin=async()=>{
       if(amobile && apassword){
        try{
            let result= await fetch(`${api}/admin/login`,{
             method:'POST',
             headers:{'Content-Type':'application/json'},
             body:JSON.stringify({mobile:amobile,password:apassword})
            });
            result= await result.json();
            if(result.token){
             localStorage.setItem('gstar_admin', result.token)
              navigate('/admin')
            }
             }catch(err){
                 console.log(err);
                 alert(err)
             }
       }
    }
    return(
        <div style={{ opacity: loading ? 0.5 : 1, color: loading ? 'black' : null}} className="mt-4 d-flex justify-content-center align-items-center">
        {loading && ( // Show spinner while loading is true
            <div className="loading-overlay">
                <Spinner animation="border" variant="primary" /> 
            </div>
        )}
        <div className="container">
            <div className="form-box">
                <div className="header-form">
                    <h4 className="text-center">
                    <img src='/static/gstar.png' alt="" height='100' />
                    </h4>
                    <h2 className="text-center text-white">Admin Login</h2>
                </div>
                <div className="body-form">
                    <form>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <svg style={{ border: '2px solid white', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#0082bc" className=" bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                </svg>
                            </div>
                            <input type="text" className="form-control" placeholder="Username" onChange={(e) => setaMobile(e.target.value)} />
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <svg style={{ border: '2px solid white', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#0082bc" className="ps-1 bi bi-key-fill" viewBox="0 0 16 16">
                                    <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                                </svg>
                            </div>
                            <input type="text" className="form-control" onChange={(e) => setaPassword(e.target.value)} placeholder="Password" />
                        </div>
                        <button type="button" className="btn w-100 bg-a text-white" style={{background:'#0082bc'}} onClick={handleadminLogin}>LOGIN</button>
                        <div className="message mt-4">
                            <div className="text-white"><input type="checkbox" /> Remember ME</div>
                            <div ><a href="#" className="text-white">Forgot your password</a></div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
        <Outlet />
    </div>
    )
}