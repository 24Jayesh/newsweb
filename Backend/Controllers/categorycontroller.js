const categorymodal =require('../Models/category')




//adding the category 
exports.addcategory =async(req,res)=>{
    const{categoryname} = req.body
    if (!categoryname) {
        return res.status(400).json({ error: 'Category name is required' });
      }
    try{
        await categorymodal.create({categoryname})
        res.json({success:true})
    }
    catch(err){
        console.log(err)
        res.json({success:false})
    }
} 


// get the category 
exports.getcategory = async(req,res)=>{
    try{
        const data =await  categorymodal.find({})
        res.json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
