import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import users from '../models/auth.js'

const signup = async (req, res) =>{
    const {name, email, password} = req.body;
    try {

        //check if user already exists
        const existinguser = await users.findOne({ email });
        if (existinguser) {
            return res.status(404).json({message: "User already exist."})// if yes send error
        }
        const hashedPassword = await bcrypt.hash(password, 12)// hash the password
        const newUser = await users.create({name, email, password: hashedPassword}) //store the user object in DB
        const token = jwt.sign({email: newUser.email, id:newUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"})//create the token
        res.status(200).json({result: newUser, token})
        
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
}

const login = async (req, res) =>{
    const {email, password} = req.body;
    
    try {
        //check if user exists if no ask them to signup
        const existinguser = await users.findOne({ email });
        if (!existinguser) {
            return res.status(404).json({message: "User don't Exist."})
        }
        const isPasswordCrt = await bcrypt.compare(password, existinguser.password) // check if the entered password matches the password in DB
        if(!isPasswordCrt){
            res.status(400).json({message: "Invalid credentials"})
        }
        //create a token
        const token = jwt.sign({email: existinguser.email, id:existinguser._id}, process.env.JWT_SECRET, {expiresIn: "1h"})


        res.status(200).json({result: existinguser, token})
        
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
}

export {
    signup,
    login
}

