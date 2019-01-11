import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom'
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

        this.state = {
            formerLocation : this.props.history.location.pathname
        }

        this.setState = this.setState.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(handleInitialData());
    }

    render() {
        console.log("App, this.props", this.props);
        const { authedUser, loading } = this.props;

        return (
                    <div className="container">
                        {
                            loading
                            ? (<Fragment>
                                    <Switch>
                                        <Route path='/' exact render={()=>{
                                            var result = authedUser === null ? <Login formerLocation={this.state.formerLocation} /> : <Login formerLocation={"/"} />;
                                            return result;
                                        }}/>
                                        <Redirect to='/' />
                                    </Switch>
                                </Fragment>)
                            :

                            (<Fragment>
                                <Nav />
                                <Switch>
                                    <Route path='/' exact component={QuestionList} />
                                    <Route path='/questions/:id' exact render={()=>(<Question isHome="false" />)} />
                                    <Route path='/add' component={NewQuestion} />
                                    <Route path='/leaderboard' component={LeaderBoard} />
                                    <Route component={PageNotFound} />
                                </Switch>
                            </Fragment>)
                        }
                    </div>



        );
    }

}

function mapStateToProps({ authedUser }) {
    console.log("App, this.props: ", this.props)
    return{
        authedUser,
        loading: authedUser === null || authedUser === "-1",

    }
}

export default withRouter(connect(mapStateToProps)(App))
