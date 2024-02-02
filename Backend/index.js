require("dotenv").config();
const express =require("express");
const app =express();
const cors=require('cors');
const cookiParser =require("cookie-parser")

const databs = require("./db/database");

//import router
const router =require('./Routes/router');



const PORT=process.env.PORT;  //5001


//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/uploads",express.static("./uploads"));
app.use(cookiParser());
app.use(router);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});