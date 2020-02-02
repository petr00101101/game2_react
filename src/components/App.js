import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import Question from './Question'
import NewQuestion from './NewQuestion'
import QuestionList from './QuestionList'
import LeaderBoard from './LeaderBoard'
import Login from './Login'
import PageNotFound from './PageNotFound'
import PrivateRoute from './PrivateRoute'

class App extends Component {
  
    render() {        
        const { redirect } = this.props;
   
        console.log('App props', this.props);
        
        console.log('App redirect? ', redirect);

        var result =
            redirect ?
            (<Fragment>                
                <Route exact path='/login' component={Login} />
                <Redirect from='*' to='/login' />
            </Fragment>)
            :
            (<Fragment>                                        
                <Nav />
                <Switch>
                    <PrivateRoute path='/home' exact key={Date.now()} component={QuestionList} />
                    <PrivateRoute path='/home/questions/:id' key={Date.now()} isHome="false" component={Question} /> />
                    <PrivateRoute path='/home/add' key={Date.now()} component={NewQuestion} />
                    <PrivateRoute path='/home/leaderboard' key={Date.now()} component={LeaderBoard} />
                    <Route component={PageNotFound}/>
                </Switch>
            </Fragment>);          

        return (result);
    }
}

function mapStateToProps({ authedUser, usersQuestionsLoadReady}) {    
    return{        
        authedUser,
        usersQuestionsLoadReady,
        redirect: (authedUser != null && authedUser != "-1") && usersQuestionsLoadReady == true ? false : true        
    }
}

export default withRouter(connect(mapStateToProps)(App))
