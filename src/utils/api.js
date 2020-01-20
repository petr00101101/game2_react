import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
  _validateToken,
  _login,
} from './_DATA.js'

export function getInitialData (token) {  
  return Promise.all([
        _getUsers(token),
        _getQuestions(token),
    ]).then(([users,questions])=>({users,questions}));  
  
}

export async function saveQuestion (info,token) {    
  return _saveQuestion(info,token);  
}

export async function saveQuestionAnswer (info,token) {  
  return _saveQuestionAnswer(info,token)
}

export async function validateToken(token) {  
  return _validateToken(token);
}

export async function login(username, password) {  
  return _login(username, password);
}
