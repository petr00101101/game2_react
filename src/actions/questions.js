import { showLoading, hideLoading } from 'react-redux-loading'
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

    return (dispatch, getState) => {
        dispatch(showLoading());
        const { authedUser } = getState();

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author
        })
        .then( (question) => {
            dispatch(addQuestion(question));
            dispatch(addQuestionUser(question));
        })
        .then(()=>dispatch(hideLoading()));;


    }
}

export function handleOnSubmitQuestionAnswer(info) {
    return (dispatch) => {

        dispatch(submitQuestionAnswer(info));
        dispatch(submitQuestionAnswerUser(info));

        return saveQuestionAnswer(info)
            .catch( (e)=> {
                console.warn('Error in handleOnSubmitQuestionAnswer: ', e);
                alert('The was an error submitting your answer. Try again.');
            })

    }
}
