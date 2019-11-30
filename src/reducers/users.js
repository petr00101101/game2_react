import { RECEIVE_USERS, SUBMIT_QUESTION_ANSWER_USER, ADD_QUESTION_USER} from '../actions/users'

export default function users(state = [], action) {
    let userToUpdate = null;
    switch (action.type) {
        case RECEIVE_USERS:
            return [...action.users]
        case SUBMIT_QUESTION_ANSWER_USER:
            const { authedUser, qid, answer } = action;
            userToUpdate = JSON.parse(JSON.stringify(
                state.filter((q)=>{return q._id == authedUser})[0]
            ));
            
            return [
                ...state.filter((q)=>{return q._id !== authedUser}),
                {
                    ...userToUpdate,
                    answers: {
                        ...userToUpdate.answers,
                        [qid] : answer
                    }
                }
            ]
        case ADD_QUESTION_USER:
            const { author, id } = action;

            userToUpdate = state.filter((u)=>{return u._id == author})[0];            
            
            return [
                ...state.filter((u)=>{return u._id != author}),
                {
                    ...userToUpdate,
                    questions: userToUpdate.questions.concat([id])                    
                }
            ]
        default:
            return state;
    }
}
