import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import Question from './Question'
import NewQuestion from './NewQuestion'
import QuestionList from './QuestionList'
import LeaderBoard from './LeaderBoard'
import Login from './Login'
import PageNotFound from './PageNotFound'

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
            <div className="container">
            {loading ?
                (<Fragment>
                    <Switch>
                        <Route path='/' exact render={()=>{                                                                                         
                            return <Login formerLocation={"/"} />;                                            
                        }}/>
                        <Route component={PageNotFound}/>                                        
                    </Switch>
                </Fragment>)
                :
                (<Fragment>
                    <Nav />
                    <Switch>
                        <Route path='/' exact component={QuestionList} />
                        <Route path='/questions/:id' render={()=>(<Question isHome="false" />)} />
                        <Route path='/add' component={NewQuestion} />
                        <Route path='/leaderboard' component={LeaderBoard} />
                        <Route component={PageNotFound}/>                                    
                    </Switch>
                </Fragment>)
            }
            </div>
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
