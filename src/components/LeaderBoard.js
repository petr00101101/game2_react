import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, ListGroupItem, ListGroup } from 'react-bootstrap'
import Cookies from 'js-cookie'
import { handleInitialData } from '../actions/shared.js'
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

const override = css`
  display: block;
  margin: 0 auto;  
  display: flex;    
`;

function User(props){
    const{user} = props;
    
    return(
        <Panel className="questionPanel">
            <Panel.Body className="questionBody">
                <img
                    src={ require( `../assets/${user.avatarURL}` ) }
                    alt={`Avatar of ${user.name}`}
                    className='avatar'
                />
                <ListGroup>
                    <ListGroupItem className="userListGroupItemBody">
                        <div><h4><b>{user.name}</b></h4></div>
                    </ListGroupItem>
                    <ListGroupItem className="userListGroupItemBody">
                        <div className="userContainer">
                            <div className="userContainer1">
                                <b>Answered Questions</b> </div>
                            <div className="userCount">
                                <b>{questionsAnswered(user)}</b> </div>
                        </div>
                    </ListGroupItem>
                    <ListGroupItem className="userListGroupItemBody">
                        <div className="userContainer">
                            <div className="userContainer1">
                                <b>Created Questions</b> </div>
                            <div className="userCount">
                                <b>{questionsTotal(user) - questionsAnswered(user)}</b> </div>
                        </div>
                    </ListGroupItem>
                </ListGroup>
                <ListGroup>
                    <ListGroupItem className="userListGroupItemBody2">
                    <div className="score"><h4><b>Score</b></h4></div>
                    <div className="score"><h4><b>{questionsTotal(user)}</b></h4></div>

                    </ListGroupItem>
                </ListGroup>

            </Panel.Body>
        </Panel>
    )
    
}

class LeaderBoard extends Component {

    state={loading:true};

    async componentDidMount(){
        console.log('LeaderBoard componentDidMount');        
        const {dispatch} = this.props;
        var token = Cookies.get('id');
        await dispatch(handleInitialData(token));
        this.setState(()=>({loading:false}));
    }

    render() {
        const{ orderedUserIds, users } = this.props;        

        var result = this.state.loading ?
        (<span className="loginFormContainer">
            <PulseLoader
            css={override}
            size={20}            
            color={"#7ED321"}
            loading={this.state.loading} />
        </span>) :
        (
            <Panel >
                <ul>
                    { orderedUserIds.map( (id) => (
                        <li key={id}>
                            <User user={users[id]}/>
                        </li>
                    ))}
                </ul>
            </Panel>
        )

        return(result)

    }

}

function questionsAnswered(user){
    return Object.keys(user.answers).length;
}

function questionsTotal(user){
    return questionsAnswered(user) + user.questions.length;
}

function mapStateToProps({users}) {

    return {
        users,
        orderedUserIds: Object.keys(users)
            .sort((a,b)=>
                questionsTotal(users[b]) - questionsTotal(users[a]))
    }
}

export default connect(mapStateToProps)(LeaderBoard)
