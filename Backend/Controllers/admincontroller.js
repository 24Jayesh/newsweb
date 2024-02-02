const newAdmin =require('../Models/admin');
//const {body ,validationResult}=require('express-validator')
const bcrypt =require('bcryptjs');



//for user registration 
exports.addinguser=async(req,res)=>{
    const {fname,email,password,cpassword} =req.body;

    //checking validation
    if(!fname || !email || !password || !cpassword){
        return res.status(400).json({error:"All fields are required!"})
    }  
    else{
        try{
     
             const preuser = await newAdmin.findOne({email:email})  //databse email :frontent email

             if(preuser){
                return res.status(400).json({error:"This email is Already Exist!"}) 
             }else if(password !==cpassword){
                return res.status(400).json({error:"Password and Confirm Password Not Match"})
             }else{
                const finalUser =new newAdmin ({
                    fname,email,password,cpassword        //fname:fname or fname because db and input feild have same name 
                });

                //here password hasing 
                const storeData =await finalUser.save();
               // console.log(storeData);
                return res.status(200).json({success:"User register Sucessfully!"})

             }


        }catch(error){
            return res.status(400).json(error);
            console.log("catch block error");

        }
    }    
}

//login user 

exports.loginuser=async(req,res)=>{
    //   console.log(req.body);

    const {email,password} =req.body;

    //checking validation
    if(!email || !password){
        return res.status(400).json({error:"All fields are required!"})
    }  
    else{
        try{
             const userValid = await newAdmin.findOne({email:email});
             if(userValid){
                const isMatch = await bcrypt.compare(password,userValid.password);    //entered passwort ,old passwordat the time of register
                if(!isMatch){
                   res.status(400).json({error:"Invalid Password"});
                }
                else{
                    //generating token
                    const token =  await userValid.generateAuthtoken();  //at adim modal
                     // console.log(token);

                     //cookie genrating 
                     res.cookie("usercookie",token,{
                          expires:new Date(Date.now()+9000000),
                          httpOnly:true
                     });

                     const result = {
                        userValid,
                        token
                     }
                     res.status(200).json({status:200,result});
                } 
            }
        }
        catch(error){
            return res.status(400).json(error);
            console.log("catch block error");
        }
    }
}
                        
                        
                        
//user valid 
exports.validUser = async(req,res)=>{
    try {
         //console.log("done");
         const ValidUserOne = await newAdmin.findOne({_id:req.userId});
         res.status(200).json({status:200,ValidUserOne});
    } catch (error) {
        console.log("error at backend")
        res.status(400).json({status:400,error});
    }                       
}    


//logout user 
exports.logoutuser =async(req,res)=>{
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie",{path:"/"});

        req.rootUser.save();

        res.status(200).json({status:200})

    } catch (error) {
        res.status(400).json({status:400,error})
    }
}

































//  router.post('/createadmin',
//  [
//            body('email').isEmail(),
//            body('password','Invalid password').isLength({min:5})
//  ],
//  async(req,res)=>{
//          const errors =validationResult(req)
//          if(!errors.isEmpty()){
//             return res.status(400).json({errors:errors.array()});

//          } 
        
//          const salt =await bcrypt.genSalt(5);
//          const secPassword =await bcrypt.hash(req.body.password,salt);
//          try{
             
//             await newAdmin.create({
//                 name:req.body.name,
//                 password:secPassword,
//                 email:req.body.email
//             })
//             res.json({success:true});
//          }
//          catch(error){
//             console.log(error);
//             res.json({success:false});
//          }
//  })








//  router.post('/loginuser',[
    

//     body('email').isEmail(),
//     body('password','Incorrect password').isLength({min:5})
//  ],async (req,res)=>{
//     const errors =validationResult(req)
//     if(!errors.isEmpty()){
//        return res.status(400).json({errors:errors.array()});

//     } 
//      let email =req.body.email;
//     try{
//         let adminData =await newAdmin.findOne({email})
//          if(!adminData){
//             return res.status(400).json({errors:"check your email or sign up"})
//          }
//          const pwdcompare =await bcrypt.compare(req.body.password,adminData.password);
//           if(!pwdcompare){
//             return res.status(400).json({errors:"enter correct password"})
//           }
//           const data ={
//             admin:{
//                 id:adminData.id
//             }
//           }
//           const authToken = jwt.sign(data,jwtSecret)
//         //   localStorage.setItem('authToken',authToken)
//         // localStorage.setItem('authToken', JSON.stringify(authToken));
//           return res.json({success:true,authToken:authToken})
   
//         }catch(err){
//              console.log(err)
//              res.json({success:false})
//     }

//  })
//  module.exports =router;