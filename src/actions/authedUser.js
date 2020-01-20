import { validateToken } from '../utils/api.js'
import Cookies from 'js-cookie'

export const SET_AUTHED_USER = 'SET_AUTHED_USER'

export function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id        
    }
}

export async function handleAuthenticate() {
    console.log('in handleAuthenticate')
    var token = Cookies.get('id');
    console.log("token:", token);
    if (typeof token !== 'undefined' && token) {
        var userId = await validateToken(token);
        console.log('authenticate userId:', userId);            
        return userId;
    } 
    else return -1;        

}