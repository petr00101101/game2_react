import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import Question from './Question'

class QuestionList extends Component {

    render() {
        return (
            <Tabs defaultActiveKey={1} className="tabs" id="tabs">                
                <Tab eventKey={1} title="Unanswered Questions" >
                    <ul>
                        {this.props.unansweredQuestionIds
                            .map( (id) => (
                            <li key={id}>
                                <Question id={id} isHome="true"/>
                            </li>
                        ))}
                    </ul>
                </Tab>                
                <Tab eventKey={2} title="Answered Questions" >
                <ul>
                    {this.props.answeredQuestionIds
                        .map( (id) => (
                        <li key={id}>
                            <Question id={id} isHome="true"/>
                        </li>
                    ))}
                </ul>
                </Tab>
            </Tabs>
        )
    }
}

function mapStateToProps( {questions, authedUser} ) {

    var unansweredQuestionIds = [];
    var answeredQuestionIds = [];

    var questionsIds = Object.keys(questions)
        .sort((a,b)=> questions[b].timestamp - questions[a].timestamp)

    for (var i=0; i<questionsIds.length; i++) {
        var qid = questionsIds[i];
        if (questions[qid].optionOne.votes.includes(authedUser) || questions[qid].optionTwo.votes.includes(authedUser)){
            answeredQuestionIds.push(questions[qid]._id);
        }
        else unansweredQuestionIds.push(questions[qid]._id);
    }    

    return {
        unansweredQuestionIds,
        answeredQuestionIds
    }
}

export default connect(mapStateToProps)(QuestionList)
