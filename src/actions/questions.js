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

export function handleAddNewQuestion ({ optionOneText, optionTwoText, author }) {
    return async (dispatch, getState) => {
        var result = await saveQuestion({
            optionOneText,
            optionTwoText,
            author
        });        
        dispatch(addQuestion(result));
        dispatch(addQuestionUser(result));
    }
}

export function handleOnSubmitQuestionAnswer(info) {
    return async (dispatch) => {
        dispatch(submitQuestionAnswer(info));
        dispatch(submitQuestionAnswerUser(info));
        
        var result = await saveQuestionAnswer(info);        
    }
}
