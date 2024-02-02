const mongoose = require('mongoose')


const newsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    authorname:{
        type:String,
        required:true,
    },
    countryname:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    url_news:{
        type:String,
        require:true,
    },
    category:{
        type: String,
        require:true
    },
    profile:{
        type:String,
        rquired:true,

    },
    datecreated:Date,    
    dateUpdated:Date

})
const insertapp=mongoose.model('insertapp',newsSchema);
module.exports =insertapp;