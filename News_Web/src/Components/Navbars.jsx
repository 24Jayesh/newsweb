import React from 'react'
import {Link} from 'react-router-dom'

const Navbars = () => {
  return (
    <div>
       
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark text-light"> 
       
      <Link className="navbar-brand" to="/"> News App</Link>
   
    <div className="collapse navbar-collapse text-light" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item mx-2 ">
             {/* Home  */}
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        
        <li className="nav-item mx-2"> 
        {/* Business */}
          <Link className="nav-link active" aria-current="page" to="/business">Business</Link>
        </li>
        <li className="nav-item mx-2"> 
        {/* Entertainment */}
          <Link className="nav-link active" aria-current="page" to="/entertainment">Entertainment</Link>
        </li>
        
        <li className="nav-item mx-2"> 
        {/* Health */}
          <Link className="nav-link active" aria-current="page" to="/health">Health</Link>
        </li>
        <li className="nav-item mx-2">
           {/* Science */}
          <Link className="nav-link active" aria-current="page" to="/science">Science</Link>
        </li>
        <li className="nav-item mx-2">
           {/* Sport */}
          <Link className="nav-link active" aria-current="page" to="/sport">Sport</Link>

        </li>
        <li className="nav-item mx-2"> 
        {/* Technology */}
          <Link className="nav-link active" aria-current="page" to="/technology">Technology</Link>
        </li>
       
      </ul>
      </div>
        <div className=' float-right'  ><button type="button" className="btn btn-success "> <Link className="nav-link active text-light" aria-current="page" to="/login">Admin Login</Link></button>
</div>
      </nav>
        
      </nav>
    </div>
  )
}

export default Navbars
