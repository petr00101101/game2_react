import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { handleAuthenticate } from '../actions/authedUser'
import { connect } from 'react-redux'


class PrivateRoute extends React.Component{
   
  state = {
    redirect: true,
    loading: true,    
  }

  async componentDidMount(){

    console.log('Privateroute componentDidMount');
    
    const { dispatch, authedUser } = this.props;              
    
    var userId = await handleAuthenticate();    
    console.log('PrivateRoute userId', userId);      
    
    if(userId != null && userId != -1 ) {
      
      if (authedUser != userId ) {
        // something went wrong, should logout user and
        // redirect to login        
      }      
            
      this.setState(()=>({loading: false, redirect: false}));        
    }
    else 
    this.setState(()=>({loading: false, redirect: true}));           
    
  }

  async componentDidUpdate(prevProps){    
   
    console.log('Privateroute componentDidUpdate');
    
    const { dispatch, authedUser } = this.props;               
    
    if(this.props.authedUser != prevProps.authedUser) {
      // something went wrong, should logout user and
      // redirect to login
    }   
  
  }
  
  
  render() {
    const { component: Component, ...rest } = this.props;
    var result = this.state.loading ? <span>Loading</span> :    
      this.state.redirect ? <Redirect to='/login' /> : <Route {...rest} render={() => (<Component {...rest} />)} /> ;
    
    return (result);

  }
 
}

function mapStateToProps({ users, questions, authedUser }) {    
  return{
    users,
    questions,
    authedUser  
  }
}

export default connect(mapStateToProps)(PrivateRoute);