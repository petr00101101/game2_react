let users = {
  '5dc72349d5aa81af5650f0e5': {
    id: '5dc72349d5aa81af5650f0e5',
    name: 'Sarah S.',
    avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
    answers: {
      "5dc720dc0f051afb6fd6db41": 'optionOne',
      "5dc721d182ef37213dfbe9aa": 'optionTwo',
      "5dc7220e82ef37213dfbe9ab": 'optionTwo',
      "5dc72255d5aa81af5650f0e2": 'optionTwo'
    },
    questions: ['5dc720dc0f051afb6fd6db41', '5dc7220e82ef37213dfbe9ab']
  },
  '5dc72349d5aa81af5650f0e6': {
    id: '5dc72349d5aa81af5650f0e6',
    name: 'Tyler T.',
    avatarURL: "https://tylermcginnis.com/would-you-rather/tyler.jpg",
    answers: {
      "5dc72294d5aa81af5650f0e3": 'optionOne',
      "5dc722c0d5aa81af5650f0e4": 'optionTwo',
    },
    questions: ['5dc72255d5aa81af5650f0e2', '5dc72294d5aa81af5650f0e3'],
  },
  '5dc72349d5aa81af5650f0e7': {
    id: '5dc72349d5aa81af5650f0e7',
    name: 'John J.',
    avatarURL: "https://tylermcginnis.com/would-you-rather/dan.jpg",
    answers: {
      "5dc722c0d5aa81af5650f0e4": 'optionOne',
      "5dc72294d5aa81af5650f0e3": 'optionTwo',
      "5dc721d182ef37213dfbe9aa": 'optionTwo'
    },
    questions: ['5dc721d182ef37213dfbe9aa', '5dc722c0d5aa81af5650f0e4'],
  }
}

let questions = {
  "5dc720dc0f051afb6fd6db41": {
    id: '5dc720dc0f051afb6fd6db41',
    author: '5dc72349d5aa81af5650f0e5',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['5dc72349d5aa81af5650f0e5'],
      text: 'have horrible short term memory',
    },
    optionTwo: {
      votes: [],
      text: 'have horrible long term memory'
    }
  },
  "5dc721d182ef37213dfbe9aa": {
    id: '5dc721d182ef37213dfbe9aa',
    author: '5dc72349d5aa81af5650f0e7',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'become a superhero',
    },
    optionTwo: {
      votes: ['5dc72349d5aa81af5650f0e7', '5dc72349d5aa81af5650f0e5'],
      text: 'become a supervillain'
    }
  },
  "5dc7220e82ef37213dfbe9ab": {
    id: '5dc7220e82ef37213dfbe9ab',
    author: '5dc72349d5aa81af5650f0e5',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'be telekinetic',
    },
    optionTwo: {
      votes: ['5dc72349d5aa81af5650f0e5'],
      text: 'be telepathic'
    }
  },
  "5dc72255d5aa81af5650f0e2": {
    id: '5dc72255d5aa81af5650f0e2',
    author: '5dc72349d5aa81af5650f0e6',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
       text: 'be a front-end developer',      
    },
    optionTwo: {
      votes: ['5dc72349d5aa81af5650f0e5'],
      text: 'be a back-end developer'
    }
  },
  "5dc72294d5aa81af5650f0e3": {
    id: '5dc72294d5aa81af5650f0e3',
    author: '5dc72349d5aa81af5650f0e6',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['5dc72349d5aa81af5650f0e6'],
      text: 'find $50 yourself',
    },
    optionTwo: {
      votes: ['5dc72349d5aa81af5650f0e7'],
      text: 'have your best friend find $500'
    }
  },
  "5dc722c0d5aa81af5650f0e4": {
    id: '5dc722c0d5aa81af5650f0e4',
    author: '5dc72349d5aa81af5650f0e7',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['5dc72349d5aa81af5650f0e7'],
      text: 'write JavaScript',
    },
    optionTwo: {
      votes: ['5dc72349d5aa81af5650f0e6'],
      text: 'write Swift'
    }
  },
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
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

export function _saveQuestion (question) {
  return new Promise((res, rej) => {
    const authedUser = question.author;
    const formattedQuestion = formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          questions: users[authedUser].questions.concat([formattedQuestion.id])
        }
      }

      res(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      res()
    }, 500)
  })
}
