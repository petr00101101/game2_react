import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Nav from './Nav'
import Question from './Question'
import NewQuestion from './NewQuestion'
import QuestionList from './QuestionList'
import LeaderBoard from './LeaderBoard'
import Login from './Login'

class App extends Component {
    componentDidMount(){
        this.props.dispatch(handleInitialData());
    }

    render() {

        const {loading} = this.props;

        return (
            <Router>

                    <div className="container">
                        {
                            loading
                            ?  <Fragment>
{/*
                                    <Route path='/' exact component={Login} />
                                    <Redirect to='/' />
*/}
                                    <Route path='/login' exact component={Login} />
                                    <Redirect from='/' to='/login' />
                                </Fragment>
                            :
                            <Fragment>
                                <Nav />
                                {/*
                                <Route path='/questions' exact component={QuestionList} />
                                <Route path='/questions/:id' exact render={()=>(<Question isHome="false" />)} />
                                */}
                                <Route path='/' exact component={QuestionList} />
                                <Route path='/questions/:id' exact render={()=>(<Question isHome="false" />)} />
                                <Route path='/add' component={NewQuestion} />
                                <Route path='/leaderboard' component={LeaderBoard} />


                            </Fragment>
                        }
                    </div>

            </Router>

        );
    }

}

function mapStateToProps({ authedUser }) {
    return{
        loading: authedUser === null
    }
}

export default connect(mapStateToProps)(App)
