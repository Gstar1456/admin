const mongoose = require('mongoose');


const db= async()=>{
    await mongoose.connect('mongodb://localhost:27017/admin')
    .then(()=> console.log("Localhost Database cannected"))
    .catch((err)=> console.log(err))
}


// const db= async()=>{
//     await mongoose.connect('')
//     .then(()=> console.log("Live Database cannected"))
//     .catch((err)=> console.log(err))
// }

module.exports= db;