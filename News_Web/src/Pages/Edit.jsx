import React, {useState,useEffect} from 'react'

import Card from "react-bootstrap/Card" 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Spinners from "../Components/Spinner/Spinners"
import {singleNewsgetfunc,editfunc,getcategoryfunc} from "../services/Api"
import {useNavigate} from "react-router-dom"
import { useParams } from 'react-router-dom';


const Addnews = () => {
  const [inputdata, setInputData] = useState({
            title: "",
            authorname: "",
            countryname: "",
            description: "",
            url_news: "",
            user_profile: "",
            // category:""
          });
    
    // const [newsprofile,setNewsProfile] = useState({}); 
    // const [status, setStatus] = useState(""); 
        const [options, setOptions] = useState([]); //for options 
        const [category,setCategory] = useState("");
        const [image, setImage] = useState("");  
        const [showspin,setShowSpin] = useState(true);
        const navigate =useNavigate();
        const {id} = useParams();

    //setinput value
      const setInputValue=(e)=>{
        const {name,value} =e.target;
        setInputData({...inputdata,[name]:value})
      }


      
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

    

      // //set options 
      // const options = [
      //   { value: "Health", label: "Health" },
      //   { value: "Business", label: "Business" },
      //   { value: "Sports", label: "Sports" },
      //   { value: "Technology", label: "Technology" },
      //   { value: "Entertainment", label: "Entertainment" },
      //   { value: "Science", label: "Science" },
        
      // ];


  //set status 
  const setStatusValue = (e) => {
    setCategory(e.value);
  };

    
      // profile set
      const setProfile = (e) => {
          setImage(e.target.files[0])
        }
        


      //get the particular news 
      const newsProfileGet = async(id)=>{
          const response = await singleNewsgetfunc(id);
          // console.log(response.data);
           if(response.status === 200){
              setInputData(response.data);
              setCategory(response.data.category);
            }else{
                console.log("error");
            }
        }
        
   
    
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
        } //else if (image === "") {
        //   toast.error("Img is Required !")
        // } 
         else {
          // console.log('sucessfully');
         
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
    
           const response = await editfunc(id,data,config); //config ==header  //this is for caling the api 
          
          if(response.status === 200){  //this is for if any filed is empty and reload the page all filed should be empty
            navigate("/allnews");
          }else{
            toast.error("Error!")
          }
    
         }
      
    };

    useEffect(() => {   
      newsProfileGet(id);
  },[])
  return (
    //  {
    // showspin ? <Spinners/>:
    <div className="container m-5">
      <h2 className="text-center m-6">Update News</h2>
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
              /> */}
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Label>Enter the Type of News</Form.Label>
              <Select options={options} defaultValue={category} onChange={setStatusValue} />
            </Form.Group>
            {/* </Form.Group> */}
            <Button variant="primary" type="submit" onClick={submitUserData}>
              Submit
            </Button>
          </Row>
        </Form>
      </Card>
      <ToastContainer position="top-center" />
    </div>
    // }
  );
  
}


export default Addnews

