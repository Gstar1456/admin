
const nodemailer = require('nodemailer');
const Product = require('./model')
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ---------email delivery --------------

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'premcschariraha@gmail.com',
    pass: 'odwr nbkz rqva whgd',
  }
})

const sendemail = async (admin, password) => {
  const mailOptions = {
    from: 'premcschariraha@gmail.com',
    to: admin.email,
    subject: 'Prem Common Service Center',
    html: `
    <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #ef96fbcc;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .header img {
      max-width: 150px;
      margin-bottom: 10px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
    }
    .content h2 {
      color: #333333;
      font-size: 20px;
      margin-bottom: 10px;
    }
    .content p {
      color: #555555;
      font-size: 16px;
      line-height: 1.5;
      margin: 10px 0;
    }
    .footer {
      background-color: #f4f4f4;
      color: #555555;
      text-align: center;
      padding: 10px;
      font-size: 14px;
    }
    .button {
      display: inline-block;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div className="email-container">
    <!-- Header Section -->
    <div className="header">
      <img src="https://gstarinfotech.com/wp-content/uploads/2017/05/logo-final.png" alt="Gstar E-Solution Logo" />
      <h1>Welcome to Gstar E-Solution Pvt Ltd!</h1>
    </div>

    <!-- Content Section -->
    <div className="content">
      <h2>Hi ${admin.name},</h2>
      <p>
        We’re excited to have you on board as a new Employee for <strong>Gstar E-Solution Pvt Ltd</strong>. 
        With your new Employee account, you’ll have access to tools and resources to manage and enhance 
        our platform effectively.
      </p>
      <p>
        To get started, please log in to your Employee dashboard and explore the features available to you.
      </p>
      <p> <span style='font-weight:bolder'>Usernsane : </span/> ${admin.mobile} <p/>
       <p><span style='font-weight:bolder'>Password : </span/> ${password} <p/>
     <!--  <p style="text-align: center;">
         <a href="[Employee Dashboard URL]" className="button">Go to Employee Dashboard</a>
       </p> -->
    </div>
    <!-- Footer Section -->
    <div className="footer">
      <p>If you have any questions, feel free to contact us at support@gstar-esolution.com.</p>
      <p>© 2024 Gstar E-Solution Pvt Ltd. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`
  }
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
}

exports.addproduct = async (req, res) => {
  const product = req.body.product;
  const employeeid = req.body.id;
  const editid = req.body.editid;
  console.log(editid)
  if (editid !== undefined || null || "") {
    await Product.findOneAndDelete({ _id: editid });
  }
  const data = { ...product, entryby: employeeid }
  const newProduct = new Product(data);
  await newProduct.save()
    .then((savedproduct) => {
      if (savedproduct) {
        res.status(200).json({ msg: 'Product details added successfully' })
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err, msg: "Error while saving product details" })
    })
}

exports.todayentry = async (req, res) => {
  try {
    const id = req.body.id;
    const date = req.body.date
    let product = await Product.find({
      // createdAt:{$gte:date}
    });
    res.status(200).json({ product: product })
  } catch (err) {

  }
}

exports.uploadpdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const id = req.body.id;
    const uploadedby= req.body.uploadedby;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const pdfurl = req.file.filename
    if (pdfurl !== undefined) {
      product.pdf = pdfurl;
      product.uploadedby=uploadedby
    }
    await product.save();
    res.status(200).json({
      msg: "File uploaded successfully",
      filePath: `/${req.file.filename}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error while uploading pdf" })
  }
}

exports.download = async (req, res) => {
  try {
    console.log(req.body.filename)
    const filename = req.body.filename
    console.log(filename)
    const filePath = path.join(__dirname, "../../uploads", filename);
    console.log(filePath)
    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error while downloading pdf. Please retry" })
  }
}

exports.nopdf = async (req, res) => {
  try {
    let data = await Product.find({pdf:''});
    if (data.length > 0) {
      res.status(200).json({ data: data })
    } else {
      res.status(404).json({ msg: "No data found" })
    }
  } catch (err) {
    console.log(err);

  }
}

exports.allentry = async (req, res) => {
  try {
    let data = await Product.find();
    if (data.length > 0) {
      res.status(200).json({ data: data })
    } else {
      res.status(404).json({ msg: "No data found" })
    }
  } catch (err) {
    console.log(err);

  }
}

exports.entrybydate = async(req,res)=>{
  try{
   
 const {startDate, endDate}= req.body;
 console.log(startDate, endDate)
 const start = new Date(startDate);
 const end = new Date(endDate);
 var data;
 const [y,m,d]=start.toString().split('-');
 const [y1,m1,d1]=end.toString().split('-');
 if(y==y1 && m==m1 && d==d1){
  console.log("if block")
  let e = new Date(start);
end.setDate(start.getDate() + 1);
  data= await Product.find({
    createdAt: {
      $gte: start,
      $lt: e,
    }
   })
 }else{
  data= await Product.find({
    createdAt: {
      $gte: start,
      $lt: end,
    }
   })
 }
 
 console.log(data)
 if(data.length>0){
  res.status(200).json({data:data})
 }
  }catch(err){
    console.log(err);
    res.status(500).json({err:err})
  }
}