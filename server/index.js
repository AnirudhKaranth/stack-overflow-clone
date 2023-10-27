
import express from 'express'
import { urlencoded } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'

import userRoutes from './routes/users.js'
import questionRoutes  from './routes/Questions.js'
import answerRoutes  from './routes/Answers.js'
import chatRoutes from './routes/Chat.js'


const app = express();

app.use(express.json({limit: "30mb", extended: true}))
app.use(urlencoded({limit: "30mb", extended: true}))
app.use(cors())
// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
//     res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
//     next(); 
// })

app.get('/', (req, res)=>{
    res.send("This is a stack overflow clone api")
})

app.use('/user', userRoutes)
app.use('/questions', questionRoutes )
app.use('/answer', answerRoutes )
app.use('/chat', chatRoutes)

const PORT = process.env.PORT || 5000

const DATABASE_URL= process.env.CONNECTION_URL
mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>app.listen(PORT,()=>{console.log(`server running on port ${PORT}`)}))
    .catch((err)=> console.log(err.message)) 