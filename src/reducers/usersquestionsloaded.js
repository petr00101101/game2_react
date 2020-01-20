import { SET_USERS_QUESTIONS_LOAD_READY } from '../actions/shared'

export default function usersQuestionsLoadReady(state = null, action) {
  switch( action.type ) {
      case SET_USERS_QUESTIONS_LOAD_READY:
          return action.value;            
      default:
          return state;
  }
}