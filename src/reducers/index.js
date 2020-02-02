import { combineReducers } from 'redux'
import authedUser from './authedUser'
import questions from './questions'
import users from './users'
import tokenExpired from './tokenExpired'
import usersQuestionsLoadReady from './usersquestionsloaded'

export default combineReducers({
    authedUser,
    users,
    questions,
    usersQuestionsLoadReady,
    tokenExpired,
})
