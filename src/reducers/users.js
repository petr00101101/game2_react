import { RECEIVE_USERS, SUBMIT_QUESTION_ANSWER_USER, ADD_QUESTION_USER} from '../actions/users'

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case SUBMIT_QUESTION_ANSWER_USER:
            const { authedUser, qid, answer } = action;
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid] : answer
                    }
                }
            }
        case ADD_QUESTION_USER:
            const { author, id } = action;
            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions: state[author].questions.concat([id])
                }
            }
        default:
            return state;
    }
}
