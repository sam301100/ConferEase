import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage(){
    const [email,  setEmail] = useState('');
    const [password,setPassword] = useState('');

    async function handleLoginSubmit(ev){
      ev.preventDefault(); //so it will not reload the page.
  
      try{
        await axios.post('/login', {email,password});
        alert('Login Successful !');
      } catch (e) {
        alert('Login Failed.');
      }
  
    }

    return (

    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-20">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>

          <input type="email" placeholder="Enter your email address" 
              value={email}
              onChange={ev => setEmail(ev.target.value)}
              />

          <input type="password" placeholder="Enter password" 
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              />

          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
    )
    
}

// modify mb-28 to center the login form 