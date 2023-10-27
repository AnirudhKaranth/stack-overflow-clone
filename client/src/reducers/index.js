import {combineReducers} from 'redux'
import authReducer from './auth.js'
import chatReducer from './chat.js'
import currentUserReducer from './currentUser.js'
import questionsReducer from './questions.js'
import usersReducer from './users.js'
export default combineReducers({
    authReducer, 
    currentUserReducer,
    questionsReducer,
    usersReducer,
    chatReducer,
})