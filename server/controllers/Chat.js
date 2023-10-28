import SerpApi  from 'google-search-results-nodejs';
import mongoose from "mongoose"
import Chat from "../models/Chat.js"

const AskBot = async (req, res) => {
    const chatData = req.body;
    const chatBody = new Chat({ ...chatData });
    const { _id, chatQuestion } = chatBody
    try {
        await chatBody.save();
        
        //using serpapi fetching results from google and saving it in database.  Here chatquestion is the question asked by users and is recieved from front end

        const search = new SerpApi.GoogleSearch(process.env.SERP_API_KEY);
        const params = {
            engine: "google",
            q: `${chatQuestion}`
        };

        const callback = async (data) => {
            const chatAnswer = await data["organic_results"][0].snippet;
            await Chat.findByIdAndUpdate(_id, { $set: { 'chatAnswer': chatAnswer } })
        };
        
        // Show result as JSON
        search.json(params, callback);

        /////////////////////////////////////////////////////////////////////////////////// 
        res.status(200).json("Posted a question successfully");
    } catch (error) {
        console.log(error)
        res.status(409).json("Couldn't post a new question");
    }

}


 const getAllChats = async (req, res) => {
   try {
       const data = req.body;
       const {userId} = data; //get the userid

       //get all the chats of particular user
       const botquestions = await Chat.find({userId: userId});
       res.status(200).json(botquestions)
   } catch (error) {
     console.log(error);
   }
}

export  {
    AskBot,
    getAllChats
}