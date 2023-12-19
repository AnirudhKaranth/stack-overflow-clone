import * as api from '../api'
import { setCurrentUser } from './currentUser'

export const signup = (authData, navigate)=>async (dispatch)=>{
    try {
        const {data} = await api.signUp(authData)
        dispatch({type:'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    } catch (error) {
        alert(error.response.data.msg)
        console.log(error);
    }
} 

export const login = (authData, navigate)=>async (dispatch)=>{
    try {
        const {data }= await api.logIn(authData)
        dispatch({type: 'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    } catch (error) {
        alert(error.response.data.msg)
        console.log(error);
    }
}

export const verifysignUp = (authData, navigate)=>async (dispatch)=>{
    try {
        const {data }= await api.verifySignUp(authData);
        dispatch({type: 'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    } catch (error) {
        alert(error.response.data.msg)
        console.log(error);
    }
}
export const verifylogin = (authData, navigate)=>async (dispatch)=>{
    try {
        const {data }= await api.verifyLogIn(authData)
        dispatch({type: 'AUTH', data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/')
    } catch (error) {
        alert(error.response.data.msg)
        console.log(error);
    }
}




// {
//     "result": {
//         "_id": "637b69167902547095aa138a",
//         "name": "arun",
//         "email": "arun47@gmail.com",
//         "number": "1234567",
//         "tags": [],
//         "joinedOn": "2022-11-21T12:03:34.714Z",
//         "__v": 0
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdiNjkxNjc5MDI1NDcwOTVhYTEzOGEiLCJudW1iZXIiOiIxMjM0NTY3IiwiaWF0IjoxNjY5MDM4MjUzLCJleHAiOjE2NjkwNDE4NTN9.fqXx34-XM9SOCAEhHYHdiFUgzExM9u6-P2V9y74n4vk"
// }