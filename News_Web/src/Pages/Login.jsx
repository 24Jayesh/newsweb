import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Link,NavLink} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Navbars from '../Components/Navbars'
import {userloginfunc} from '../services/Api'
import {toast } from "react-toastify"

import './min.css'


const Login = () => {

  const [passShow,setPassShow] =useState(false);  //for password hide and show 
  const navigate =useNavigate();

  const [inputvalue,setInputValue]=useState({
    email:"",
    password:""
  })

    //set the input fileds 
    const setVal =(e)=>{
      const {name,value} =e.target;
      setInputValue({...inputvalue,[name]:value})
    }
     
    
  //for submit button  and validation
    const loginuser=async(e)=>{
      e.preventDefault();
      const {email, password} = inputvalue;
 
      if (email === "") {
          toast.error("email is required!", {
              position: "top-center"
          });
      } else if (!email.includes("@")) {
          toast.warning("includes @ in your email!", {
              position: "top-center"
          });
      } else if (password === "") {
          toast.error("password is required!", {
              position: "top-center"
          });
      } else if (password.length < 6) {
          toast.error("password must be 6 char!", {
              position: "top-center"
          });
      }else {
         // console.log("user registration succesfully done");

          
        //  const data = new FormData(); //logic to enter take the data for backend
        //  data.append("email",email)
        //  data.append("password",password)
        
          const data = {
            email,password
          }

         const config = {
           "Content-Type":"application/json",
         }
   
         const response = await userloginfunc(data,config); //config ==header  //this is for caling the api 
          //console.log(response.data);

         if(response.status === 200){  //this is for if any filed is empty and reload the page all filed should be empty
        //    toast.success("Login Sucessfully", {
        //      position: "top-center"
        //  });
        //  console.log(JSON.stringify(response.result.token));
         localStorage.setItem("userdatatoken",JSON.stringify(response.data.result.token));
         navigate("/allnews");
           setInputValue({
             ...inputvalue,
             email:"",
             password:""
           });
         }else{
           toast.error("Error!")
         }


      }
   }




  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Welcome Back, Log In</h1>
            <p>Hi, we are you glad are back. Please Login.</p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={inputvalue.email}
                onChange={setVal}
                placeholder="Enter your email address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}   //flase == password ,true == text
                  name="password"
                  id="password"
                  value={inputvalue.password}
                  onChange={setVal}
                  placeholder="Enter your password"
                />
                <div className="showpass"  onClick={() => setPassShow(!passShow)}>{!passShow ? "Show" : "Hide"}</div>
              </div>
            </div>
            <button className='btn' onClick={loginuser} >Login</button>
            <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink></p>
          </form>
        </div>
      </section>
    </>
  );}



export default Login
