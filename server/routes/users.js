import express  from 'express'
import { signup, login } from "../controllers/auth.js"
import { loginOtp, signupotp, verifyOtpLogin, verifyOtpSignup } from "../controllers/authOtp.js"
import { getAllUsers, updateProfile } from "../controllers/users.js"
import auth  from "../middlewares/auth.js"

const router = express.Router();
router.post('/signup', signup)
router.post('/login',login)
router.post('/signupotp',signupotp) 
router.post('/verifyotpsign',verifyOtpSignup)
router.post('/verifyotplogin',verifyOtpLogin)
router.post('/loginotp',loginOtp)

router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)

export default router