import express  from 'express'
import { AskBot, getAllChats } from '../controllers/Chat.js'
import auth  from '../middlewares/auth.js'

const router = express.Router()

router.post("/Ask",auth,AskBot)
router.post("/get",auth,getAllChats)

export default router
