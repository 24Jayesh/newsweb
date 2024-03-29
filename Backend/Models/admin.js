const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt =require('bcryptjs');
const jwt = require("jsonwebtoken");
const keysecret = process.env.SECRET_KEY;


const adminSchema = new mongoose.Schema({
 
     fname:{
        type:String,
        required:true,
        trim:true,
     },
     email:{
        type:String,
        required :true,
        unique:true,
        validate(value){
          if(!validator.isEmail(value)){
            throw new Error("Invalid Email Id")
          }
        }
     },
     password:{
      type:String,
      required:true,
      minlength:6,
     },
     cpassword:{
      type:String,
      required:true,
      minlength:6,
     },
     tokens:[
      {
         token:{
            type:String,
            required: true,
         }
      }
     ]

})

//hash password 
adminSchema.pre("save",async function(next){

   if(this.isModified("password")){
   this.password=await bcrypt.hash(this.password,12);
   this.cpassword=await bcrypt.hash(this.cpassword,12);
   }
        
   next();
});

//generating token  function body
adminSchema.methods.generateAuthtoken = async function(){
    try{
        let tokengen = jwt.sign({_id:this._id},keysecret,{
         expiresIn:"1d"
        });
        this.tokens=this.tokens.concat({token:tokengen});
        await this.save();
        return tokengen;
    }catch(error){
         res.status(400).json(error);
    }
}

module.exports =mongoose.model('adminSchema',adminSchema);


