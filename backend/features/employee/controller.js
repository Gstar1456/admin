const Employee = require('./model')
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const security_key = process.env.SECURITY_KEY;

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

exports.signup = async (req, res) => {
    const { name, mobile, email, password } = req.body;
    const hashpassword = await bcryptjs.hash(password, 10)
    let admin = new Employee({ name, mobile, email, password: hashpassword });
    await admin.save()
        .then(async (newAdmin) => {
            if (newAdmin) {
                await sendemail(newAdmin, password)
            }
            res.status(200).json({ status: true })
        }
        ).catch((err) => {
            console.log(err);
            res.status(500).send(err);
        })
}

exports.login = async (req, res) => {
    try {
        const { mobile, password } = req.body;
        let user = await Employee.findOne({ mobile: mobile });
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }
        if (await bcryptjs.compare(password, user.password)) {
            const token = jwt.sign({ mobile: user.mobile }, security_key, { expiresIn: "5h" })
            res.status(200).json({ token: token })
        } else {
            res.json({ msg: "Wrong password" })
        }
    } catch (err) {
        console.log(err)
    }
}

exports.getprofile = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ msg: "Authorization header missing" });
        }

        // Extract token
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ msg: "Token missing from authorization header" });
        }
        let admin;
        try {
            admin = jwt.verify(token, security_key); // Ensure security_key is correctly set
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ msg: "Session expired" });
            }
            if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ msg: "Invalid token, Please relogin" });
            }
            throw err; // Unexpected JWT error
        }
        const user = await Employee.findOne({ mobile: admin.mobile });
        if (!user) {
            return res.status(404).json({ msg: "Employee not found" });
        }
        return res.status(200).json({ employee: user, msg: "Profile retrieved successfully" });

    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ msg: "An unexpected error occurred", error: err.message });
    }
};
