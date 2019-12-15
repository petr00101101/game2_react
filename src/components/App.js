import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import Question from './Question'
import NewQuestion from './NewQuestion'
import QuestionList from './QuestionList'
import LeaderBoard from './LeaderBoard'
import Login from './Login'
import PageNotFound from './PageNotFound'
import PrivateRoute from './PrivateRoute'

class App extends Component {
    constructor(props) {
        super(props);        
        this.setState = this.setState.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(handleInitialData());
    }

    render() {        
        const { authedUser, loading } = this.props;
        
        

        return (
            
            loading ?
                (<Fragment>
                    <Switch>                                                
                        <Route exact path='/login' component={Login} />
                        <Route>
                            <Redirect to='/login' />
                        </Route>
                        <Route component={PageNotFound}/>
                    </Switch>
                </Fragment>)
                :
                (<Fragment>
                    <Nav />
                    <Switch>
                        <PrivateRoute path='/home' exact component={QuestionList}/>
                        <PrivateRoute path='/home/questions/:id' isHome="false" component={Question} />)} />
                        <PrivateRoute path='/home/add' component={NewQuestion} />
                        <PrivateRoute path='/home/leaderboard' component={LeaderBoard} />
                        <Route component={PageNotFound}/>

                        {/* <Route path='/' exact component={QuestionList} />
                        <Route path='/questions/:id' render={()=>(<Question isHome="false" />)} />
                        <Route path='/add' component={NewQuestion} />
                        <Route path='/leaderboard' component={LeaderBoard} />
                        <Route component={PageNotFound}/>                                     */}
                    </Switch>
                </Fragment>)           
            
        );
    }
}

function mapStateToProps({ authedUser }) {    
    return{
        authedUser,
        loading: authedUser === null || authedUser === "-1",
    }
}

export default withRouter(connect(mapStateToProps)(App))
