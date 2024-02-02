import React, {useState,useEffect} from 'react'

import Card from "react-bootstrap/Card" 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Spinners from "../Components/Spinner/Spinners"
import {addnewsfunc,getcategoryfunc} from "../services/Api"
import {useNavigate} from "react-router-dom"


const Addnews = () => {
  const [inputdata, setInputData] = useState({
            title: "",
            authorname: "",
            countryname: "",
            description: "",
            url_news: "",
            user_profile: ""
            // category:""
          });
    
        const [options, setOptions] = useState([]); //for options 
        const [image, setImage] = useState("");  
        const [showspin,setShowSpin] = useState(true);
        const [category,setCategory] = useState("");
        const navigate =useNavigate();

       //get token 
       let token =JSON.parse(localStorage.getItem("userdatatoken"));

        //get the all category 
        const categoryGet = async () => {
          const response = await getcategoryfunc();
            //  console.log(response.data)          

           //set options 
          const mappedOptions = response.data.map((item) => (
            { value: item.categoryname, label: item.categoryname}
          ));
        
          // console.log(response.data);
          if (response.status === 200) {
            setOptions(mappedOptions); 
          } else {
            console.log("error for get categort data");
          }
        };
        useEffect(()=>{
          categoryGet();
        },[]);
   
        //set options 
      //   const options = [
      //    { value: "Health", label: "Health" },
      //    { value: "Business", label: "Business" },
      //    { value: "Sports", label: "Sports" },
      //    { value: "Technology", label: "Technology" },
      //    { value: "Entertainment", label: "Entertainment" },
      //    { value: "Science", label: "Science" },
         
      //  ];

    
      //setinput value
      const setInputValue=(e)=>{
        const {name,value} =e.target;
        setInputData({...inputdata,[name]:value})
      }
    
  
    
      // profile set
      const setProfile = (e) => {
        setImage(e.target.files[0])
      }

  //set status 
   const setStatusValue = (e) => {
    setCategory(e.value);
  };
    
  
    

      //submit userdata used by toast 
      const submitUserData = async(e) => {
        e.preventDefault();
    
        const {title, authorname, countryname,description,url_news} = inputdata;
    
        if (title === "") {
          toast.error("Title is Required !")
        } else if (authorname === "") {
          toast.error("Author name is Required !")
        }  else if (countryname === "") {
            toast.error("Country name is Required !")
        } else if (description === "") {
          toast.error("Description  is Required !")
        } 
        // else if (url_news === "") {
        //   toast.error("URL is Required !")
        // }
         else if (category==="") {
          toast.error("Enter category ")
        } 
        else if (image === "") {
          toast.error("Img is Required !")
        } 
         else {
          // console.log(image);
         
          const data = new FormData(); //logic to enter ttake thee data for backend
          data.append("title",title)
          data.append("authorname",authorname)
          data.append("countryname",countryname)
          data.append("description",description)
          data.append("url_news",url_news)
          data.append("category",category)
          data.append("user_profile",image)

          const config = {
            "Content-Type":"multipart/form-data"
          }
    
          const response = await addnewsfunc(data,config); //config ==header  //this is for caling the api 
          
          if(response.status === 200){  //this is for if any filed is empty and reload the page all filed should be empty
            setInputData({
              ...inputdata,
            title: "",
            authorname: "",
            countryname: "",
            description: "",
            url_news: ""
            // category:""
            });
            setImage("");
            setCategory("");

            navigate("/allnews");
          }else{
            toast.error("Error!")
          }
    
         }
    
        
        //for sipnner 
        useEffect(() => {   
        
          setTimeout(() => {  //for spinner 
            setShowSpin(false)
          }, 1200)
        }, [])
      
    };
  return (
    <>
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


  :  <div className="container m-5">
      <h2 className="text-center m-6">News Input</h2>
      <Card className="shadow mt-3 p-3 ">
        <Form>
          <Row>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={inputdata.title}
                onChange={setInputValue}
                placeholder="Enter Title"
              />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Author Name </Form.Label>
              <Form.Control
                type="text"
                name="authorname"
                value={inputdata.authorname}
                onChange={setInputValue}
                placeholder="Enter Authore name"
              />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Country Name</Form.Label>
              <Form.Control
                type="text"
                name="countryname"
                value={inputdata.countryname}
                onChange={setInputValue}
                placeholder="Enter Coutry name"
              />
            </Form.Group>
            <Form.Group
              className="mb-3 col-lg-6"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={inputdata.description}
                onChange={setInputValue}
                rows={4}
              />
            </Form.Group>
            <Form.Group controlId="urlInput">
              <Form.Label>News URL</Form.Label>
              <Form.Control type="url" placeholder="Enter URL" name='url_news' value={inputdata.url_news} onChange={setInputValue} />
              <Form.Text className="text-muted">
                Please enter a valid URL.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Select Your News Image</Form.Label>
              <Form.Control
                type="file"
                name="user_profile"
                onChange={setProfile}
                placeholder="Select Your Profile"
              />
            </Form.Group>
            {/* <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Enter the Type of News</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={inputdata.category}
                onChange={setInputValue}
                placeholder="Enter Your Location"
              />
            </Form.Group> */}
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Enter the Type of News</Form.Label>
              <Select options={options} onChange={setStatusValue} name="category" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submitUserData}>
              Submit
            </Button>
          </Row>
        </Form>
      </Card>
      <ToastContainer position="top-center" />
    </div>
  
    }
   </>
    );
  
}

export default Addnews

