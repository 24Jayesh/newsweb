const News = require('../Models/news') 
const moment =require("moment");

exports.newsstore=async(req,res)=>{
    const file = req.file.filename;
    const {title,authorname,countryname,description,url_news,category} =req.body;

//  if(!title || !authorname || !countryname || !description || !category || !file){
//     res.status(401).json("All inputs is required")
//  }

 try{

  
        const datecreated =moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
        const newsData =new News({
            title,authorname,countryname,description,url_news,category,profile:file,datecreated
        });
         
        const result = await newsData.save();
        res.status(200).json(result);
       
}catch(error){
    res.status(401).json(error);
 }

}


//get all the news 

exports.newsget=async(req,res)=>{
    try{
          const newsGetData=await News.find();
        //   console.log(newsGetData);
          res.status(200).json(newsGetData);
    }catch(error){
        res.status(401).json(error);
    }

}


///single news get 
exports.singlenewsget=async(req,res) => {
 const {id} = req.params;
 try{
    const getSingle=await News.findOne({_id:id});
//    console.log(getSingle);
    res.status(200).json(getSingle);
}catch(error){
  res.status(401).json(error);
}
}


// upadet the news 
exports.updatenews=async(req,res)=>{
    const {id} = req.params;
    const {title,authorname,countryname,description,url_news,category,user_profile} =req.body;
    const file = req.file ? req.file.filename : user_profile;

    //consle.log(req.body);

    try{
        const dateUpdated =moment(new Date()).format("YYYY-MM-DD hh:mm:ss")

        const newsupdate=await News.findByIdAndUpdate({_id:id},{
            title,authorname,countryname,description,url_news,category,profile:file,dateUpdated
        },{
            new:true
        });
    
        const ans = await newsupdate.save();
        // console.log(ans);
        res.status(200).json(ans);
    }catch(error){
      res.status(401).json(error);
    }
}


// delete user
exports.userdelete = async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletuser = await News.findByIdAndDelete({ _id: id });
        // console.log("user is deleted ",deletuser);
    } catch (error) {
        res.status(401).json(error)
    }
}