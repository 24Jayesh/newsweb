import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button';
import {userlogoutgfunc} from '../services/Api'

function Headers() {
      
  const navigate =useNavigate();

  //logout user 
  const logoutuser = async () => {
    let token =JSON.parse(localStorage.getItem("userdatatoken"));
    
    const config= {
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`,
      "Accept": "application/json",
      "credentials": "include"
      
    };
    // console.log(config);
    const response = await userlogoutgfunc(config);
    // console.log(response);

    if (response.data?.status == 200) {
        console.log("use logout");
        localStorage.removeItem("userdatatoken");
        navigate("/");
    } else {
        console.log("error");
    }
}
localStorage.removeItem("usersdatatoken");

  //for adduser btn
  const adduser=()=>{
    navigate('/addnews')
  } 


  return (
    <>
             
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark text-light"> 
        <Link className="navbar-brand"> News App</Link>
        <div className="add_btn">
              <Button variant="primary" onClick={adduser}> <i className="fa-solid fa-plus"></i>&nbsp; Add News</Button>
        </div>
        <div className="collapse navbar-collapse text-light" id="navbarSupportedContent"></div>
        <div className=' float-right'  >
            <button type="button" className="btn btn-success " onClick={() => { logoutuser() }}> <Link className="nav-link active text-light" aria-current="page">Admin Logout</Link></button>
      </div>
      </nav>  
    </nav>
    </>
  )
}

export default Headers
