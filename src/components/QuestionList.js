import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'
import Question from './Question'
import Cookies from 'js-cookie'
import { handleInitialData } from '../actions/shared.js'
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

const override = css`
  display: block;
  margin: 0 auto;  
  display: flex;    
`;

class QuestionList extends Component {

    state={loading:true};

    async componentDidMount(){        
        console.log('QuestionList componentDidMount');
        const {dispatch} = this.props;
        var token = Cookies.get('id');
        await dispatch(handleInitialData(token));
        this.setState(()=>({loading:false}));
    }

    render() {
        var result = this.state.loading ?
        (<span className="loginFormContainer">
            <PulseLoader
            css={override}
            size={20}            
            color={"#7ED321"}
            loading={this.state.loading} />
        </span>)
        :(
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
        return result;
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
