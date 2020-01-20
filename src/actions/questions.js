import { submitQuestionAnswerUser, addQuestionUser } from './users'
import { saveQuestionAnswer, saveQuestion } from '../utils/api'


export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SUBMIT_QUESTION_ANSWER = 'SUBMIT_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function submitQuestionAnswer({authedUser, qid, answer}) {
    return {
        type: SUBMIT_QUESTION_ANSWER,
        authedUser,
        qid,
        answer,
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
};

export function handleAddNewQuestion ({ optionOneText, optionTwoText, author },token) {
    return async (dispatch) => {
        var result = await saveQuestion({
            optionOneText,
            optionTwoText,
            author
        }, token);        
        dispatch(addQuestion(result));
        dispatch(addQuestionUser(result));
    }
}

export function handleOnSubmitQuestionAnswer(info,token) {
    return async (dispatch) => {
        dispatch(submitQuestionAnswer(info));
        dispatch(submitQuestionAnswerUser(info));
        
        var result = await saveQuestionAnswer(info,token);        
    }
}
