import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import facebook from "./Assets/img/facebook.png";
import google from "./Assets/img/google.png";
import user from "./Assets/img/user.png";
import flag from "./Assets/img/flag.png";
import Home from "./Home";

const LoginSignup = (props) => {
  let history = useHistory();
  const [user, setUser] = useState({});
  const [email, setEmail] = useState({});
  const [phone, setPhone] = useState({});
  const [cpassword, setCpassword] = useState({});
  const [invalid, setInvalid] = useState()
  const [login, setLogin] = useState(false)
  const [password, setPassword] = useState({});
  const users = {userName:user.UserName, Password:password.Password}
  const register=  {userName:user.UserName, Password:password.Password, email:email.email, phone:phone.phone, cpassword:cpassword.cpassword}
  const handleLogin = (e) => {
    // fetching the url
    fetch("http://gamepitara.globaldigitaz.com/api/login",{
      method:"Post",
      headers:{
        "Content-type":"application/json",
        "Accept":"application/json"
      },
       body:JSON.stringify(users)
    }).then((result)=>{
      result.json().then((res)=>{
        res.map(persons =>{
          if(user.UserName==persons.userName && password.Password== persons.Password){
            setLogin(true)
            history.push('/home')
            localStorage.setItem('auth', persons.id)
            // localStorage.setItem("user", persons.userName)
          } else{
            setLogin(false)
            setInvalid("Your userid & password does  not match")
          }
        })
      })
      })
    
      e.preventDefault()
      
    };
  
    //register
    const handleRegister = (e) =>{
      fetch("https://5f4bdb2dea007b0016b1dc8b.mockapi.io/login",{
      method:"POST",
      headers:{
        "Content-type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(register)
      
    })
    history.push('/home')
    localStorage.setItem('auth', "1234")
    e.preventDefault()
    console.log(email.email);
    }

    useEffect(()=>{
      if(invalid !== undefined){
        setTimeout(() => {
            setInvalid()
        }, 3000);
      };

      // if(password.Password !== cpassword.cpassword){
      //   setTimeout(() => {
      //     setInvalid("password and confrim password does not match")
      //   }, 2000);
      // } else{
        
      // }
    })
  // use effect for api calling
  return (
    <div className="mainBody">
      {props.sign ? (
        <>
          <div className="loginBody">
            <form action="">
              <div className="form-group">
                <label htmlFor="UserName">Username *</label>
                <input
                  type="text"
                  name="UserName"
                  onChange={(e) => {
                    setUser({ [e.target.name]: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  name="Password"
                  onChange={(e) => {
                    setPassword({ [e.target.name]: e.target.value });
                  }}
                />
                <p>{invalid}</p>
              </div>
              <div className="form-group">
                <button type="submit" onClick={handleLogin}>
                  log in
                </button>
              </div>
              <div className="remember">
                <div className="rememberme">
                  <p>
                    <input type="checkbox" /> <span>remember me</span>
                  </p>
                </div>
                <Link to="">forgot your password?</Link>
              </div>
            </form>
          </div>
          <div className="loginwith">
            <div className="heading">
              <h3>
                <span>or log in with</span>
              </h3>
            </div>
            <div className="images">
              <img src={facebook} alt="" />
              <img src={google} alt="" />
            </div>
          </div>
          <div className="accout">
            <img src={user} alt="" />
            <p>no account yet?</p>
            <Link to="">create an account</Link>
          </div>
        </>
      ) : (
        <>
          <div className="loginBody">
            <form action="">
              <div className="form-group">
                <label htmlFor="username">Username *</label>
                <input type="text" name="UserName" onChange={(e)=> {setUser({ [e.target.name]: e.target.value })}} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" name="email" onChange={(e)=> {setEmail({ [e.target.name]: e.target.value })}} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <div className="phone">
                  <div className="sel">
                    <img src={flag} alt="" />
                    <select name="" id="">
                      <option value="">+91</option>
                    </select>
                  </div>
                  <input type="text" name="phone" onChange={(e)=> {setPhone({ [e.target.name]: e.target.value })}} required/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input type="password" name="Password" onChange={(e)=> {setPassword({ [e.target.name]: e.target.value })}} required/>
              </div>
              <div className="form-group">
                <label htmlFor="cpassword">Confirm Password *</label>
                <input type="password" name="cpassword" onChange={(e)=> {setCpassword({ [e.target.name]: e.target.value })}} required />
                <p>{invalid}</p>
              </div>
              <div className="form-group">
                <button type="submit" onClick={handleRegister}>
                  <Link>sign up</Link>
                </button>
              </div>
              <div className="remember">
                <div className="rememberme">
                  <p>
                    <input type="checkbox" /> <span>remember me</span>
                  </p>
                </div>
                <Link to="">forgot your password?</Link>
              </div>
            </form>
          </div>
          <div className="loginwith">
            <div className="heading">
              <h3>
                <span>or sign up with</span>
              </h3>
            </div>
            <div className="images">
              <img src={facebook} alt="" />
              <img src={google} alt="" />
            </div>
          </div>
          <div className="accout">
            <img src={user} alt="" />
            <p>already an account?</p>
            <Link to="">sign in</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginSignup;
