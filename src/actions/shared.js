import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'

export const SET_USERS_QUESTIONS_LOAD_READY = 'SET_USERS_QUESTIONS_LOAD_READY'

export function setUsersQuestionsLoadReady(value) {
    return {
        type: SET_USERS_QUESTIONS_LOAD_READY,
        value        
    }
}

export function handleInitialData(token) {
    return async (dispatch) => {
        var intialData = await getInitialData(token);
        const { users, questions }  = intialData;
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
    }    
}

export function handleEmptyData() {
    return (dispatch) => {
        dispatch(receiveUsers([]));
        dispatch(receiveQuestions([]));
        dispatch(setUsersQuestionsLoadReady(false));
    }
}

