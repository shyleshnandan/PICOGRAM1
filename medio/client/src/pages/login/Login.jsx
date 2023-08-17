import { Link, useNavigate } from "react-router-dom";
import "./login.scss"
import {useContext, useState} from "react";
import { AuthContext } from "../../context/authContext";

export const Login = () => {
  const [inputs, setInputs]= useState({
    username:"",
    password:"",
  })

  const [err, setErr]= useState(null);

  const navigate = useNavigate()

  const handleChange= (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prev)=>({...prev, [name]:value}));
  }

  const {login} = useContext(AuthContext);

  const handleLogin = async(e)=>{
    e.preventDefault();
    try{
      await login(inputs);
      navigate("/")
    }
    catch(err){
      setErr(err.response.data)
    }
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
          <button >Register</button>
          </Link>
          
        </div>
        <div className="right">
          <h1>Login</h1>
          <form action="">
          <input type="text" placeholder="Username" name="username" onChange={handleChange} id="" />
          <input type="password" placeholder="Password" name="password" onChange={handleChange} />
          {err&&err}
          <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;
