import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import unirest from 'unirest'
import fast2sms from 'fast-two-sms'
import otpGenerator from 'otp-generator'
import _ from 'lodash'
import otpModel from '../models/otpModel.js'
import users from '../models/auth.js'
import usersotp from "../models/authOtp.js"

const signupotp = async (req, res) => {
    const {number } = req.body
    try {
        //check  if user already exists
        const user = await usersotp.findOne({ number})
        if (user) {
            return res.status(400).json({ msg: "User already registered" }) //send error msg if user already exists
        }else{

            //If user does not exists generate the otp and send it to user's number
            const OTP = otpGenerator.generate(6, {
                digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
            });
            
            const otp = new otpModel({ number: req.body.number, otp: OTP });
            var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");
            
            req.query({
                "authorization": process.env.API_KEY,
                "variables_values": `${otp.otp}`,
                "route": "otp",
                "numbers": `${otp.number}`
            }); 
            
            req.headers({
                "cache-control": "no-cache"
            });
            
            
            req.end(function (res) {
                if (res.error) {
                    console.log(res);
                    throw new Error(res.error);
                }
                console.log(res.body);
            });
            
            //hash the otp before storing it in db
            const salt = await bcrypt.genSalt(10);
            otp.otp = await bcrypt.hash(otp.otp, salt)
            
            //save the otp
            const result = await otp.save();
            res.status(200).json("otp sent successfully!")
            
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong")
    }
}

//VERIFY THE OTP ENTERED BY USER DURING SIGN UP
const verifyOtpSignup = async (req, res) => {
    const { name, number, otp } = req.body
    try {

        const otpHolder = await otpModel.find({ number }); //get the otp stored in db
        if (otpHolder.length === 0) {
            return res.status(400).json({ msg: "you used an experied otp!" })
        }

        const rightOtpFind = otpHolder[otpHolder.length - 1];
        const validUser = await bcrypt.compare(otp, rightOtpFind.otp); // compare the otp sent by user and otp stored in DB

        if (rightOtpFind.number === number && validUser) {
            
            //If otp is valid create user
            const user = await usersotp.create({ name, number })
           
            //create jwt token
            const token = jwt.sign({ _id: user._id, number: user.number }, process.env.JWT_SECRET, { expiresIn: "1h" })

            //Delete the used OTP from DB
            const otpDelete = await otpModel.deleteMany({ number: rightOtpFind.number })
            res.status(200).json({ result: user, token })
        }
        else {
            return res.status(400).send("Your OTP was wrong!")
        }
    } catch (error) {
        console.log(error);
    }
}

//USER LOGIN
 const loginOtp = async (req, res) => {
    const { number } = req.body
    try {
        //check if user already exists
        const user = await usersotp.findOne({ number})
        console.log(user);
        if (!user) {
            return res.status(404).json({ msg: "User is not registered" })//if not send error
        }

        //if user exists generate and send OTP
        const OTP = otpGenerator.generate(6, {
            digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
        });

        //create OTP object
        const otp = new otpModel({ number: req.body.number, otp: OTP });
        //////////////////////////////////////////////////////////////////////////////////////////////
        var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

        req.query({
            "authorization": process.env.API_KEY,
            "variables_values": `${otp.otp}`,
            "route": "otp",
            "numbers": `${otp.number}`
        }); 

        req.headers({
            "cache-control": "no-cache"
        });


        req.end(function (res) {
            if (res.error) {
                console.log(res);
                throw new Error(res.error);
            }
            console.log(res.body);
        });

        //////////////////////////////////////////////////////////////////////////////////////////////
        
        // hash the OTP before storing in DB
        const salt = await bcrypt.genSalt(10);
        otp.otp = await bcrypt.hash(otp.otp, salt)
        
        // //Store the OTP in DB
        const result = await otp.save();
        res.status(200).json({ msg: "otp sent successfully!" })

    } catch (error) {
        console.log(error);
        res.status(500).json("Something went wrong")
    }
}

//VERIFY THE OTP ENTERED BY USER DURING LOGIN
const verifyOtpLogin = async (req, res) => {
    const { number, otp } = req.body
    try {

        const otpHolder = await otpModel.find({ number });//get the otp stored in db
        if (otpHolder.length === 0) {
            return res.status(400).json({ msg: "you used an experied otp!" })
        }

        const rightOtpFind = otpHolder[otpHolder.length - 1];
        const validUser = await bcrypt.compare(otp, rightOtpFind.otp);// compare the otp sent by user and otp stored in DB

        if (rightOtpFind.number === number && validUser) {
            //If otp is valid create user
            const user = await usersotp.findOne({ number });
           
            //create jwt token
            const token = jwt.sign({ _id: user._id, number: user.number }, process.env.JWT_SECRET, { expiresIn: "1h" })

            //Delete OTP from DB
            const otpDelete = await otpModel.deleteMany({ number: rightOtpFind.number })
            res.status(200).json({ result: user, token })
        }
        else {
            return res.status(400).send("Your OTP was wrong!")
        }
    } catch (error) {
        console.log(error);
    }
}

export{
    signupotp,
    verifyOtpSignup,
    loginOtp,
    verifyOtpLogin
}