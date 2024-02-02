import {commonrequest} from "./ApiCall";
import {BASE_URL} from "./helper";

//for news resgister 
export const addnewsfunc = async(data,header)=>{
    return await commonrequest('POST',`${BASE_URL}/news/register`,data,header);//commonrequest(method,url,data,header)
}

//for all news get
export const  allnewsgetfunc =async()=>{
    return await commonrequest('GET',`${BASE_URL}/news/details`,"");
}

//for singele news get 
export const singleNewsgetfunc = async(id)=>{
    return await commonrequest('GET',`${BASE_URL}/singlenews/${id}`);
}


//for update the news
export const editfunc= async(id,data,header) =>{
    return await commonrequest('PUT',`${BASE_URL}/news/edit/${id}`,data,header);
}

//for delete the news 
export const deletfunc = async(id)=>{
    return await commonrequest("DELETE",`${BASE_URL}/news/delete/${id}`,{});
}




//apis for geting the category 
export const getcategoryfunc = async()=>{
    return await commonrequest("GET",`${BASE_URL}/category`,"");
}



//apis for  user 
//user register
export const userregisterfunc=async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/register`,data,header);
}
//user login 
export const userloginfunc=async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/login`,data,header);
}
//user valid 
export const uservalidfunc =async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/validuser`,{},header)
}
//user logout 
export const userlogoutgfunc =async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/validuser`,{},header)
}