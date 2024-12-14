const express= require('express')
const router= express.Router();

const {getprofile, signup, login}= require('./controller')

router.post('/signup',signup);
router.post('/login', login);
router.get('/getprofile', getprofile)


module.exports=router;