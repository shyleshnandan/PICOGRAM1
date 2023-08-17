import { useState } from "react";
import "./register.scss";
import {Link} from "react-router-dom";
import axios from 'axios';

export const Register = () => {

  const [inputs, setInputs]= useState({
    username:"",
    email:"",
    password:"",
    name:"",

  })

  const [err, setErr]= useState(null);

  const handleChange= (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev)=>({...prev, [name]:value}));
  }

  const handleClick=async e=>{
    e.preventDefault()

    try{
      await axios.post("http://localhost:8800/api/auth/register", inputs)
    }
    catch(err){
      setErr(err.response.data);
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>pico gram.</h1>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
          
        </div>
        <div className="right">
          <h1>Register</h1>
          <form action="">
          <input type="text" placeholder="Username" name="username" onChange={handleChange} id="" />
          <input type="text" placeholder="Email" name="email" onChange={handleChange}/>
          <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            <input type="text" placeholder="Name"name="name" onChange={handleChange}/>
          {err && err}
          <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;
