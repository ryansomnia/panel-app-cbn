import React,{useState} from 'react'
import axios from "axios";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import "./style.css";
export default function Login() {

  const api = `http://89.116.228.164:5001/cbn/v1/admin/login`;

const [username, setUsername] =useState("");
const [password, setPassword] =useState("");

const navigate = useNavigate(); 

const saveUser = async(e) =>{
  e.preventDefault();
      try {
       let res =  await axios.post(api, {
          username,
          password
        });
        Toast.fire({
          icon: 'success',
          title: `Selamat datang <br> ${res.data.data.fullName}`
        })
        localStorage.setItem('user', res.data.data)
        navigate("/dashboard")
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: err.response.data.message,
          text: err.response.data.error
        })
      }
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

  return (
    <div className="login">
      <div className="left"></div>

      <div className="right">
   
        <div className="input-section">
          <div className="text-area">
            <h1>Login</h1>
            <p>Wellcome back! Please enter your detail</p>
          </div>
          <form onSubmit={saveUser}>
          <div className="username-area">
            <input className="username-input" 
            placeholder="Username"
            id='username'
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
            type="text" 
            name="username"
            />
          </div>
          <div className="password-area">
            <input className="password-input" 
            placeholder="Password"
            id='password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            type="password"
            name="password"
            />
          </div>
          <div className="forgot-area">
            <p>Forget Password? </p>
          <button>Click Here</button>
          </div>
          <button className="btn-login" type='submit'>LOGIN</button>
          </form>  
      
        </div>
      
      </div>
     
    </div>
  );
}
