export const RECEIVE_USERS = 'RECEIVE_USERS'
export const SUBMIT_QUESTION_ANSWER_USER = 'SUBMIT_QUESTION_ANSWER_USER'
export const ADD_QUESTION_USER = 'ADD_QUESTION_USER'

export function receiveUsers(users){
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function submitQuestionAnswerUser({authedUser, qid, answer}){
    return {
        type: SUBMIT_QUESTION_ANSWER_USER,
        authedUser,
        qid,
        answer,
    }
}

export function addQuestionUser(question){
    const { author, id } = question
    return {
        type: ADD_QUESTION_USER,
        author,
        id
    }
}
