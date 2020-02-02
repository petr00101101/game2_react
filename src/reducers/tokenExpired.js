import { SET_TOKEN_EXPIRED } from '../actions/tokenExpired'

export default function tokenExpired(state = null, action) {
    switch( action.type ) {
        case SET_TOKEN_EXPIRED:
            return action.value;        
        default:
            return state;
    }
}
