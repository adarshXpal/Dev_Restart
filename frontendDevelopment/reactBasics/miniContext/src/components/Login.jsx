import React, { useContext } from 'react'
import UserContext from '../context/UserContext'

const Login = () => {
  const [username,setUsername]=React.useState("");
  const [password,setPassword]=React.useState("");
  const{user,setUser}=useContext(UserContext);
  const handleSubmit=(e)=>{
    e.preventDefault();
    setUser({username,password});
    console.log(user);
  }
  return (
    <div>
        <h1>Login</h1>
        <input type="text"
        value={username} 
        onChange={(e)=>setUsername(e.target.value)}
        placeholder='username' />
        <input type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder='password' />
        <button onClick={handleSubmit}>{user.password}</button>
    </div>
  )
}

export default Login