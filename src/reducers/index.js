import { combineReducers } from 'redux'

import authedUser from './authedUser'
import questions from './questions'
import users from './users'
import { loadingBarReducer } from 'react-redux-loading'
import usersQuestionsLoadReady from './usersquestionsloaded'

export default combineReducers({
    authedUser,
    users,
    questions,
    usersQuestionsLoadReady,
    loadingBar: loadingBarReducer,
})
