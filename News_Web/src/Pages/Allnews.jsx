import React, { useState, useEffect} from "react";
import TablesNew from "../Components/Table/TablesNew";
import Card from "react-bootstrap/Card"
import Spinners from "../Components/Spinner/Spinners";
import { Navigate, useNavigate } from "react-router-dom";
// import { addData , dltdata, updateData} from '../../components/context/ContextProvider';
import { allnewsgetfunc,deletfunc,uservalidfunc} from "../services/Api";
import { toast } from "react-toastify";
import Headers from "../Components/Headers";

const Allnews = () => {
  const [userdata, setUserData] = useState([]);
  const [showspin, setShowSpin] = useState(true);
  // const { useradd, setUseradd } = useContext(addData);

  // const {update,setUpdate} = useContext(updateData);
  // const {deletedata, setDLtdata} = useContext(dltdata);


  const navigate =useNavigate();


      //user validation and user login 
      const [usdata, setUsData] = useState(false);
      let token =JSON.parse(localStorage.getItem("userdatatoken"));
     //console.log(token);
      const  DashboardValid =async()=>{
        
         const config= {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${token}`
        }
        // console.log(header)

         const response = await uservalidfunc(config);
        //console.log(response);

          if(response.data?.status===401 || !response.data){
             console.log("error page redirect")
             alert("You are Not admin")
             navigate("/");
         }else{
          console.log("user verify");
          navigate("/allnews");
         }
      }



  // get  all news
  const userGet = async () => {
    const response = await allnewsgetfunc();
    if (response.status === 200) {
      setUserData(response.data);
    } else {
      console.log("error for get news data");
    }
  };

    // news delete
    const deleteUser = async(id)=>{
      const response = await deletfunc(id);
      if(response.status === 200){
        userGet();
        setDLtdata(response.data)
      }else{
        toast.error("error")
      }
    }
   







  //spinner
  useEffect(() => {
    userGet();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200);
  }, [deleteUser]);

  
 
    useEffect(() => {
      setTimeout(() => {
          DashboardValid();
          setUsData(true)
      }, 2000)

  }, []);

  return (
    <>

    <Headers/>
     {(!token) ? 
  <Card className="text-center text-center m-5 bg-dark text-light d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
  <Card.Header>Restricted page</Card.Header>
  <Card.Body  >
    <div className='container   bg-dark text-light'  style={{ minHeight: '50vh' }}>
 <h1 className='justify-content-center ' >If you are admin plz login</h1>
 

  <hr/>
  
 <button className='btn btn-primary mx-auto d-block' onClick={()=>{navigate('/login')}}>Login</button> </div>
  </Card.Body>
  </Card>


   :  <div className="container">
   {/* { */}
   {/* showspin ? <Spinners /> : */}
   <TablesNew
     userdata={userdata}
     deleteUser={deleteUser}
     userGet={userGet}
   />
   {/* } */}
 </div>

 }
 
    
    </>
  );
};

export default Allnews;






