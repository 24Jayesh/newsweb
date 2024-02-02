import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Link,NavLink} from 'react-router-dom'
import {userregisterfunc} from '../services/Api'
import {toast } from "react-toastify"

import './min.css'


const Register = () => {

  const [passShow,setPassShow] =useState(false);  //for password hide and show 
  const [cpassShow,setCPassShow] =useState(false);

  const [inputvalue,setInputValue]=useState({
    fname:"",
    email:"",
    password:"",
    cpassword:""
  })
  const navigate =useNavigate();


  //set the input fileds 
  const setVal =(e)=>{
    const {name,value} =e.target;
    setInputValue({...inputvalue,[name]:value})
  }

  //for submit button  and validation
  const addUserdata=async(e)=>{
     e.preventDefault();
     const { fname, email, password, cpassword } = inputvalue;

     if (fname === "") {
         toast.warning("fname is required!", {
             position: "top-center"
         });
     } else if (email === "") {
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
     } else if (cpassword === "") {
         toast.error("cpassword is required!", {
             position: "top-center"
         });
     }
     else if (cpassword.length < 6) {
         toast.error("confirm password must be 6 char!", {
             position: "top-center"
         });
     } else if (password !== cpassword) {
         toast.error("pass and Cpass are not matching!", {
             position: "top-center"
         });
     } else {
        //  console.log("user registration succesfully done");
     
           //this concept is used when rhe cotent type is multioart/form data
          // const data = new FormData(); //logic to enter ttake thee data for backend
          // data.append("fname",fname)
          // data.append("email",email)
          // data.append("password",password)
          // data.append("cpassword",cpassword)

          const data = {
            fname,email,password,cpassword
          }
 
          const config = {
            "Content-Type":"application/json"
          }
          const response =await userregisterfunc(data,config); //config ==header  //this is for caling the api 
          //console.log(response);

          if(response.status === 200){  //this is for if any filed is empty and reload the page all filed should be empty
            toast.success("User register SucessFully!  ", {
              position: "top-center"
          });
         
          navigate("/login");
          setInputValue({
              ...inputvalue,
              fname:"",
              email:"",
              password:"",
              cpassword:""
     
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
            <h1>Sign UP</h1>
            <p>We hope that you will get like it.</p>
          </div>

          <form>
          <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                name="fname"
                id="fname"
                value={inputvalue.fname}
                onChange={setVal}
                placeholder="Enter your name"
              />
            </div>
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
            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}   //flase == password ,true == text
                  name="cpassword"
                  id="cpassword"
                  value={inputvalue.cpassword}
                  onChange={setVal}
                  placeholder="Confirm password"
                />
                <div className="showpass"  onClick={() => setCPassShow(!cpassShow)}> {!cpassShow ? "Show" : "Hide"}</div>
              </div>
            </div>
            <button className='btn' onClick={addUserdata}>Sign Up</button>
            <p>Have an Account? <NavLink to ="/login">Login</NavLink></p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Register;


