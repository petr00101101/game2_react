var url = require('./config.js');

export function _getUsers () {  
  return fetch(url.getUsers, {
    method: 'POST',
    cache: 'no-cache',    
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

export function _getQuestions () {
  return fetch(url.getQuestions, {
    method: 'POST',
    cache: 'no-cache',    
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

export async function _saveQuestion (question) {
  const authedUser = question.author;
  const formattedQuestion = formatQuestion(question);
  var data = { authedUser, question: formattedQuestion };
  let json;

  try {
    const response = await fetch(url.saveQuestion, { 
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    json = await response.json();
    
  }
  catch(error) {
    return console.error("_saveQuestion error:", rej)
  }    
  return json;
}

export async function _saveQuestionAnswer ({ authedUser, qid, answer }) {  

  var data = { authedUser, qid, answer };    
  let json;

  try {
    const response = await fetch(url.saveQuestionAnswer, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })    
    json = await response.json();    
  }
  catch(error) {
    return console.error("_saveQuestionAnswer error:", rej)
  }    

  return json;  
}
