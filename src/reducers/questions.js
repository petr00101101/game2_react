import { RECEIVE_QUESTIONS, SUBMIT_QUESTION_ANSWER, ADD_QUESTION } from '../actions/questions'

export default function questions(state = [], action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return [...action.questions]            
        case SUBMIT_QUESTION_ANSWER:
            const { authedUser, qid, answer } = action;
            
            let questionToUpdate = state.filter((q)=>{return q._id == qid})[0];            
                        
            return [
                ...state.filter((q)=>{return q._id !== qid}),
                {
                    ...questionToUpdate,
                    [answer]: {
                        ...questionToUpdate[answer],
                        votes: questionToUpdate[answer].votes.concat([authedUser])                        
                    }
                }
            ]
        case ADD_QUESTION:
            const { question } = action;
            return [
                ...state,
                question
            ]
        default:
            return state;
    }
}
