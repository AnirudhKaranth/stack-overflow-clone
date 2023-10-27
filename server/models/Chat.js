import mongoose  from "mongoose";

const ChatSchema = mongoose.Schema({
    chatQuestion:{type: String, required: "Question must have a body"},
    chatAnswer:{type: String, default: ''},
    userId: {type: String},
})

export default mongoose.model("Chat", ChatSchema) 