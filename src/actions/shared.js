import { getInitialData, validateToken } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import Cookies from 'js-cookie'
import { setAuthedUser } from './authedUser'

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

export function handleLogOut() {
    return (dispatch) => {
        Cookies.remove('id');
        dispatch(setAuthedUser("-1"));        
        dispatch(handleEmptyData());        
    }
}

export async function handleAuthenticate() {
    console.log('in handleAuthenticate')
    var token = Cookies.get('id');
    console.log("token:", token);
    if (typeof token !== 'undefined' && token) {
        var result = await validateToken(token);        
        console.log('handleAuthenticate result : ', result);            
        return result;
    } 
    else return -1;        

}