import Questions from '../models/Questions.js'
import mongoose from 'mongoose'

 const AskQuestion =async (req, res)=>{
    const postQuestionData = req.body;
    const postQuestion = new Questions({...postQuestionData})
    try {
        await postQuestion.save();
        res.status(200).json("Posted a question successfully");
    } catch (error) {
        console.log(error)
        res.status(409).json("Couldn't post a new question");
    }
}

 const getAllquestions = async(req, res)=>{
    try {
        const { search } = req.query;
        if(search==="all"){
            const questionList = await Questions.find();
            res.status(200).json(questionList)

        }else{
            let questionList = await Questions.find({ $or: [{ questionTitle: { $regex: search, $options: 'i' } }, { questionBody: { $regex: search, $options: 'i' } }] })
            
            res.status(200).json(questionList)

        }
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

 const deleteQuestion = async(req, res)=>{
    const {id:_id} = req.params;//get the id of question to be deleted
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...')
    }
    try {
        await Questions.findByIdAndRemove(_id); //remove the question with id 
        res.status(200).json({message: "Successfully deleted..."})
    } catch (error) {
        res.status(404).json({message: error.message})
    }

}

 const voteQuestion = async (req, res)=>{
    const {id:_id} = req.params;
    const {value, userId} =req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...')
    }
    try {
        const question = await Questions.findById(_id)
        const upIndex = question.upVote.findIndex((id)=> id === String(userId))
        const downIndex = question.downVote.findIndex((id)=> id === String(userId))

        if(value === 'upVote'){
            if (downIndex !== -1) {
               // If the value is 'upVote', it checks whether the user has previously downvoted the question. If so, it removes the user's ID from the downVote array, effectively reversing their downvote.
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
            if (upIndex === -1) {
                //If the user hasn't upvoted the question before, 
                //it pushes the user's ID into the upVote array, registering their upvote.
                question.upVote.push(userId)
            }
            else{
                 //If the user has already upvoted the question, it removes their ID from the upVote array, 
                //essentially allowing them to undo their upvote.
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
        }
        if(value === 'downVote'){
            if (upIndex !== -1) {
                 // If the value is 'downVote', it checks whether the user has previously upvoted the question. If so, it removes the user's ID from the upVote array, effectively reversing their upvote.
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
            if (downIndex === -1) {
                //If the user hasn't downvoted the question before, 
                //it pushes the user's ID into the downVote array, registering their downvote.
                question.downVote.push(userId)
            }
            else{
                //If the user has already downvoted the question, it removes their ID from the downVote array, 
                //essentially allowing them to undo their downvote.
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
        }
        await Questions.findByIdAndUpdate(_id, question)
        res.status(200).json({message: "voted successfully..."})
    } catch (error) {
        res.status(404).json({message: 'id not found'})
        
    }
}

export {
    AskQuestion,
    deleteQuestion,
    voteQuestion,
    getAllquestions
}