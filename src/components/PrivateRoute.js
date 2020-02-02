import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { handleAuthenticate, handleLogOut } from '../actions/shared'
import { connect } from 'react-redux'
import { setTokenExpired } from '../actions/tokenExpired'
import { css } from "@emotion/core";
import PulseLoader from "react-spinners/PulseLoader";

const override = css`
  display: block;
  margin: 0 auto;  
  display: flex;    
`;

class PrivateRoute extends React.Component{
   
  state = {
    redirect: true,
    loading: true,    
  }

  async componentDidMount(){

    console.log('Privateroute componentDidMount');
    console.log('Privateroute state:', this.state);

    const { dispatch, authedUser } = this.props;              
    
    var result = await handleAuthenticate();    
    console.log('PrivateRoute handleAuthenticate result: ', result);      

    if(result && result == -1) {        
      
      this.setState(()=>({loading: false, redirect: true}));            
      
      dispatch(setTokenExpired(true));
      dispatch(handleLogOut());
            
      console.log('Privateroute this.props: ', this.props);        
      console.log('Privateroute this.state: ', this.state);        
      return;        
    }        

    if(result && result != -1 ) {
      
      if (authedUser != result.id ) {
        
        const { dispatch } = this.props;        
        
        dispatch(handleLogOut());
        return;
      }      
      console.log('PrivateRoute state change');      
      this.setState(()=>({loading: false, redirect: false}));        
    }
    else 
    this.setState(()=>({loading: false, redirect: true}));
    
  }       

  render() {
    const { component: Component, ...rest } = this.props;
    var result = this.state.loading ? 
      (<span className="loginFormContainer">
        <PulseLoader
        css={override}
        size={20}            
        color={"#7ED321"}
        loading={this.state.loading} />
        </span>)    
      :    
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