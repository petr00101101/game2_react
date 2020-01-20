var url = require('./config.js');

export function _getUsers (token) {  
  return fetch(url.getUsers, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }).then(
    (res)=>{ return res.json() }
  )
  .then( (res) =>{    
    var tempArray = [];
    for(var i in res)
      tempArray.push(res[i]);
    return tempArray;    
  })
  .catch((rej)=>{console.error(rej)});
}

export function _getQuestions (token) {
  return fetch(url.getQuestions, {
    method: 'POST',
    cache: 'no-cache',    
    headers: {
      'Authorization': `Bearer ${token}`
    },
  }).then(
    (res)=>{ return res.json() }
  )
  .then( (res) =>{    
    var tempArray = [];
    for(var i in res)
      tempArray.push(res[i]);
    return tempArray;    
  })
  .catch((rej)=>{console.error(rej)});
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export async function _saveQuestion (question,token) {
  const authedUser = question.author;
  const formattedQuestion = formatQuestion(question);
  var data = { authedUser, question: formattedQuestion };
  let json;

  try {
    const response = await fetch(url.saveQuestion, { 
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',        
        'Authorization': `Bearer ${token}`        
      },
      body: JSON.stringify(data)
    });
    json = await response.json();
    
  }
  catch(error) {
    return console.error("_saveQuestion error:", error)
  }    
  return json;
}

export async function _saveQuestionAnswer ({ authedUser, qid, answer }, token) {  

  var data = { authedUser, qid, answer };    
  let json;

  try {
    const response = await fetch(url.saveQuestionAnswer, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',        
        'Authorization': `Bearer ${token}`        
      },
      body: JSON.stringify(data)
    })    
    json = response;
    
  }
  catch(error) {
    return console.error("_saveQuestionAnswer error:", error)
  }    

  return json;  
}

export async function _validateToken(token) {

  try{

    const response = await fetch(url.validateToken, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    
    var userId = {};
    
    if(response.status == 200){
      var result = await response.json();        
      userId = result ? result.id : -1;  
    }
    else userId = -1;    

  }
  catch(error){
    return console.error("_validateToken error:", error)
  }

  return userId;

}

export async function _login(username, password) {

  try{

    const response = await fetch(url.login, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })    
    var userToken = await response.json();
    
  }
  catch(error){
    return console.error("_login error:", error)
  }


  console.log('async userToken: ', userToken);
  return userToken;

}