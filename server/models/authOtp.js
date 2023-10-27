import mongoose from "mongoose";

const userotpSchema = mongoose.Schema({
    name: {type: String, required: true},
    number: {type: String, required: true},
    about: {type: String},
    tags: {type: [String]},
    joinedOn: {type: Date, default: Date.now}
})

export default mongoose.model("Userotp", userotpSchema)