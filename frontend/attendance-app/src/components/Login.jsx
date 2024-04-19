import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useSnackbar } from "notistack";


const Login = () => {

  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const goToRegister = () =>{
    navigate('/register');
  }

  const handleLogin = async() =>{
    try{
      const response = await axios.post(
        "http://localhost:4000/v1/auth/login",
        {
          username,
          password,
        }
      );
      if (response.status === 200) {
        const token = response.data.token;
        const userId = response.data.user._id;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        enqueueSnackbar("Logedin Successfully", { variant: "success" });
        navigate("/attendance");
      } else {
        console.log("Login failed");
      }
    }catch(error){
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  }


  return (
    <>
      <div className="container"> 
        <div className="form">
          <h3>Login Page</h3>
          <input type="username" value={username} onChange={(e)=>(setUsername(e.target.value))} placeholder="username" />
          <input type="password" value={password} onChange={(e)=>(setPassword(e.target.value))} placeholder="password" />
          <div className="btn">
          <button onClick={handleLogin} >Login</button>
          <button onClick={goToRegister}>Register</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;