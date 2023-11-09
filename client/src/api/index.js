import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req)=>{
    if (localStorage.getItem('Profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
    }
    return req;
})

export const logIn = (authData)=> API.post('/user/login', authData)
export const signUp = (authData)=> API.post('/user/signUp', authData)

export const otplogIn = (authData)=> API.post('/user/loginotp', authData)
export const verifyLogIn = (authData)=> API.post('/user/verifyotplogin', authData)

export const otpsignUp = (authData)=> API.post('/user/signupotp', authData)
export const verifySignUp = (authData)=> API.post('/user/verifyotpsign', authData)

export const postQuestion = (questionData) => API.post('/questions/Ask', questionData)
// export const getAllQuestions = ()=> API.get('/questions/get')

export const getAllQuestions = (search) => API.get(`/questions/get?search=${search}`)
    

export const deleteQuestion=(id)=> API.delete(`/questions/delete/${id}`) 
export const voteQuestion=(id, value, userId)=> API.patch(`/questions/vote/${id}`, {value, userId})

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId)=> API.patch(`/answer/post/${id}`,{noOfAnswers, answerBody, userAnswered, userId})
export const deleteAnswer =(id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, {answerId, noOfAnswers})

export const fetchAllUsers = ()=> API.get('/user/getAllUsers');
export const updateProfile = (id, updateData)=> API.patch(`/user/update/${id}`, updateData)

export const AskBot = (chatData) => API.post('/chat/Ask', chatData)
export const fetchAllChats = (chatId)=> API.post('/chat/get', chatId)
