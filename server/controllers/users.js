import mongoose from 'mongoose'
import User from '../models/auth.js'
import usersotp from "../models/authOtp.js"
import axios from 'axios'

 const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find();
        const alluser = await usersotp.find()
        const allUserDetails = []
        allUsers.forEach((users) => {
            allUserDetails.push({ _id: users._id, name: users.name, about: users.about, tags: users.tags, joinedOn: users.joinedOn })
        })
        alluser.forEach((users) => {
            allUserDetails.push({ _id: users._id, name: users.name, about: users.about, tags: users.tags, joinedOn: users.joinedOn })
        })
        res.status(200).json(allUserDetails)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

 const updateProfile = async (req, res) => {
    const { id: _id } = req.params
    const { name, about, tags } = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("user unavailable...")
    }

    try {
        const profile = await  User.findById(_id);
        if(profile){
            const updatedProfile = await User.findByIdAndUpdate(_id, { $set: { 'name': name, 'about': about, 'tags': tags } }, { new: true })
            res.status(200).json(updatedProfile)
        }
        else{
            const updatedProfile = await usersotp.findByIdAndUpdate(_id, { $set: { 'name': name, 'about': about, 'tags': tags } }, { new: true })
            res.status(200).json(updatedProfile)
        }
    } catch (error) {
        res.status(405).json({ message: error.message })
    }
}
 



export {
    getAllUsers,
    updateProfile,
}