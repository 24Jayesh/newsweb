
import './App.css'

import {Routes,Route} from "react-router-dom"
import Login from './Pages/Login'
import Register from './Pages/Register'
import UserPage from './Pages/UserPage'
import Navbars from './Components/Navbars'
// import CardNews from './Components/CardNews'
import Admin from './Pages/Admin'
import Addnews from './Pages/Addnews'
import Allnews from './Pages/Allnews'
import Edit from './Pages/Edit'

function App() {
 

  return (
    <>
    {/* <Navbars/> */}
  
  
      <Routes>
      {/* <Route path="/" element={<UserPage />} /> */}
      <Route path="/" element={<UserPage categoryname ={"all"} />} />
      <Route path="/sport" element={<UserPage categoryname ={"Sports"} />} />
      <Route path="/entertainment" element={<UserPage categoryname={"entertainment"} />} />
      <Route path="/business" element={<UserPage categoryname ={"Business"} />} />
      <Route path="/health" element ={<UserPage categoryname={"Health"}/>}/>
      <Route path='/science' element ={<UserPage categoryname={"politics"}/>}/>
       <Route path="/technology" element={<UserPage categoryname ={"Technology"} />} />
      <Route path="/addnews" element={<Addnews/>} />
      <Route path="/allnews" element={<Allnews/>} />
      <Route path="/edit/:id" element={<Edit />}/>

      {/* for login logout  */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/admin" element={<Admin/>} />
      </Routes>

  
    
    </>
  )
}

export default App
