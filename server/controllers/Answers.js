import mongoose  from "mongoose";
import Questions from "../models/Questions.js";

//Post a Answer
const postAnswer = async (req, res)=>{
    const { id: _id} = req.params; //get the id of question to which the answer is posted
    const {noOfAnswers, answerBody, userAnswered, userId} = req.body;

    //check if the question exists
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question unavailable...")
    }

    updateNoOfAnswers(_id, noOfAnswers)

    //Update the question object by adding this answer object to it
    try {
        const updatedQuestion = await Questions.findByIdAndUpdate(_id, { $addToSet: {'answer': [{answerBody, userAnswered, userId}]}})
        res.status(200).json(updatedQuestion)
    } catch (error) {
        res.status(400).json(error)
    }
}

//Update the no of answers of particular question.
const updateNoOfAnswers = async (_id, noOfAnswers) =>{
    try {
        await Questions.findByIdAndUpdate(_id, {$set: {'noOfAnswers': noOfAnswers}})
    } catch (error) {
        console.log(error);
    }
}

//Delete the answer
const deleteAnswer = async(req, res )=>{
    const {id:_id} = req.params //get the id of question
    const {answerId, noOfAnswers } = req.body

    //check if question exists
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question unavailable...")
    }


    //check if answerid is valid
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send("Answer unavailable...")
    }
    updateNoOfAnswers(_id, noOfAnswers)

    //delete that answer and update the question object
    try {
        await Questions.updateOne({_id},{$pull: {'answer': {_id: answerId}}})
        res.status(200).json({message: "Successfully deleted"})
    } catch (error) {
        res.status(405).json({message: "hahaha"})
    }

}


export { postAnswer, deleteAnswer}