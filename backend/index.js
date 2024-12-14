const express= require('express');
const db= require('./db');
require('dotenv').config();
const PORT= process.env.PORT || 10000
const app= express();
const cors = require('cors')
const adminRouter= require('./features/admin/router');
const employeeRouter= require('./features/employee/router');
const productRouter= require('./features/product/router')
const path = require("path");
db();
app.use(cors({
    origin:'*',
    method:['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    Credential:true
}))
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/admin', adminRouter);
app.use('/employee', employeeRouter)
app.use('/product',productRouter)

app.listen(PORT, (err)=>{
    if(err) console.log(err);
    console.log(`Server is live on ${PORT}`)
})
 