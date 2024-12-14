const mongoose = require('mongoose');


const employeeSchema=new mongoose.Schema({
    name:String,
    mobile:{
        type:Number,
        // unique:true
    },
    email:{
        type:String,
        // unique:true
    },
    password:String
});

module.exports=mongoose.model('Employee', employeeSchema)