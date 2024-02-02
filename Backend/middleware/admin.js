const jwt =require("jsonwebtoken");
const userdb =require("../Models/admin");
const keysecret =process.env.SECRET_KEY

const authenticate = async(req,res,next)=>{

    try {
        const token = req.headers.authorization.split(' ')[1];   //taken yoken from frontend and store for backend
        // console.log(token);

        const verifytoken =  jwt.verify(token,keysecret);
        //   console.log(verifytoken);
        
        const rootUser = await userdb.findOne({_id:verifytoken._id});
        // console.log(rootUser);

        if(!rootUser) {throw new Error("user not found")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        

        next();

    } catch (error) {
        // console.log("midleware error",error)
        res.status(400).json({status:400,message:"Unauthorized no token provide"})
    }
}


module.exports = authenticate