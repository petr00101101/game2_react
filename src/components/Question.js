import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, FormGroup, Radio, Button, ListGroup, ListGroupItem, ProgressBar, Badge } from 'react-bootstrap'
import { formatQuestion } from '../utils/helpers'
import { handleOnSubmitQuestionAnswer } from '../actions/questions'

import { withRouter } from 'react-router-dom'

class Question extends Component{

    state = {
        isHome: this.props.isHome
    };

    handleOnSubmitQuestionAnswer = (e) => {
        e.preventDefault();

        const{dispatch, authedUser, question } = this.props;

        if (!document.querySelector('[name="radioGroup"]:checked')) { return null;}

        dispatch(handleOnSubmitQuestionAnswer({
            authedUser: authedUser,
            qid: question.id,
            answer: document.querySelector('[name="radioGroup"]:checked').value
        }))
    }

    questionPreview(testStr){
        var pos = 0, n = 3;
        pos = testStr.indexOf(" ");

        while (--n > 0 && pos !== -1)
            pos = testStr.indexOf(" ", pos + 1);

        if (pos === -1) { return testStr}
        else return testStr.substr(0,pos);
    }

    render(){

        const { question } = this.props;

        //if (!question) { return null;}

        var votingResult;
        if (question.voted && this.state.isHome === "false" ) {

            var progress = Math.floor(100 * question.optionOneVotes/question.totalVotes);
            var complProgress = 100 - progress;
            var userVote = (
                <div style={{textAlign:'right'}}><Badge >Your Vote!</Badge></div>
            )

            var questionOne = (
                <span>
                    {question.chosenVote === "optionOne" && userVote}
                    {question.optionOneText}
                    <ProgressBar striped bsStyle="success" now={progress} label={`${progress}%`} className="progressBar"/>
                    <div className='numberOfVotesText'>{question.optionOneVotes} out of {question.totalVotes} votes</div>
                </span>
            );

            var questionTwo = (
                <span>
                    {question.chosenVote === "optionTwo" && userVote}
                    {question.optionTwoText}
                    <ProgressBar striped bsStyle="success" now={complProgress} label={`${complProgress}%`} className="progressBar"/>
                    <div className='numberOfVotesText'>{question.optionTwoVotes} out of {question.totalVotes} votes</div>
                </span>
            );

            if (question.optionOneVotes > question.optionTwoVotes) {
                votingResult = (
                    <span>
                        <ListGroupItem bsStyle="success" className="listGroupItemBody">
                            {questionOne}
                        </ListGroupItem>
                        <ListGroupItem className="listGroupItemBody">
                            {questionTwo}
                        </ListGroupItem>

                    </span>
            )}
            else if (question.optionOneVotes < question.optionTwoVotes) {
                votingResult = (
                    <span>
                        <ListGroupItem className="listGroupItemBody">
                            {questionOne}
                        </ListGroupItem>
                        <ListGroupItem bsStyle="success" className="listGroupItemBody">
                            {questionTwo}
                        </ListGroupItem>
                    </span>
            )}
            else {
                votingResult = (
                    <span>
                        <ListGroupItem className="listGroupItemBody">
                            {questionOne}
                        </ListGroupItem>
                        <ListGroupItem className="listGroupItemBody">
                            {questionTwo}
                        </ListGroupItem>
                    </span>
            )}
        }

        return(

            <Panel className="questionPanel">
                <Panel.Heading>
                { (question.voted && this.state.isHome === "false") ?
                    (<b>Asked by {question.name}</b>)
                    : ( <b>{question.name} asks:</b>)
                }
                </Panel.Heading>
                <Panel.Body className="questionBody">
                    <img
                        src={question.avatar}
                        alt={`Avatar of ${question.name}`}
                        className='avatar'
                    />
                    { (question.voted && this.state.isHome === "false") ?
                        (<ListGroup>
                                <h2 className='questionResultsHeader'>Results</h2>
                                {votingResult}
                        </ListGroup>)
                        :
                        ( this.state.isHome === "false" ) ?
                            (<FormGroup>
                                <Radio name="radioGroup" value="optionOne">
                                    {question.optionOneText}
                                </Radio>
                                <Radio name="radioGroup" value="optionTwo">
                                    {question.optionTwoText}
                                </Radio>
                                <Button type="submit" className="submitBtn" onClick={this.handleOnSubmitQuestionAnswer}>Submit</Button>
                            </FormGroup>)
                            :
                            (<FormGroup>
                                <div><b>Would You Rather</b></div>
                                <br/>
                                <div>...{this.questionPreview(question.optionOneText)}...</div>
                                <br/>

                                <Button type="submit" className="submitBtn"
                                    onClick={()=>{

                                        this.setState({ isHome: "false" });
                                        this.props.history.push('/questions/' + question.id);

                                }}>
                                    View Poll
                                </Button>
                            </FormGroup>)
                    }
                </Panel.Body>
            </Panel>

        )
    }
}

function mapStateToProps({authedUser, users, questions}, props) {

    const question = props.id? questions[props.id] : questions[props.location.pathname.slice(11)];

    const author = !question ? [] : users[question.author];

    return {
        authedUser,
        question: question
        ? formatQuestion(question, author, authedUser)
        : null,
    }
}

export default withRouter(connect(mapStateToProps)(Question))
