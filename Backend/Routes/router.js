const express =require("express");
const router =new express.Router();

//import middleware 
const authenticate =require('../middleware/admin');

//import controllers
const controllers =require('../Controllers/newscontroller');
const admincontroller =require('../Controllers/admincontroller');
const categorycontroller = require('../Controllers/categorycontroller');



//import multer 
const upload =require('../multerConfig/multerstorage')



//routes
router.post("/news/register",upload.single("user_profile"),controllers.newsstore);    //upload.single("the name is same as given in the frontend")
router.get("/news/details",controllers.newsget);
router.get("/singlenews/:id",controllers.singlenewsget);
router.put("/news/edit/:id",upload.single("user_profile"),controllers.updatenews);
router.delete("/news/delete/:id",controllers.userdelete);
router.post('/addcategory',categorycontroller.addcategory);
router.get("/category",categorycontroller.getcategory);

//routest for admin 
router.post("/register",admincontroller.addinguser);
router.post('/login',admincontroller.loginuser);
router.get('/validuser',authenticate,admincontroller.validUser);
router.get("/logout",authenticate,admincontroller.logoutuser);


module.exports =router;