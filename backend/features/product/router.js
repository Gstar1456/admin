const express= require('express')
const router= express.Router();
const multer = require('multer');
const path = require("path");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads");
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
  const upload = multer({storage});

const {entrybydate,allentry,nopdf, addproduct,todayentry, uploadpdf, download}= require('./controller')

router.post('/addproduct',addproduct);
router.post('/todayentry',todayentry);
router.post('/upload', upload.single('pdf'), uploadpdf);
router.post("/download", download)
router.post("/entrybydate", entrybydate)
router.get("/nopdf",nopdf)
router.get("/allentry", allentry)
module.exports=router;
// upload.single('pdf')