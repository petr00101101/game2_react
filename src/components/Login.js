import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, FormControl, Button, InputGroup, Glyphicon, Alert } from 'react-bootstrap';
import { setAuthedUser } from '../actions/authedUser'
import '../index.css';
import { withRouter, Redirect } from 'react-router-dom'
import { setUsersQuestionsLoadReady, handleAuthenticate } from '../actions/shared.js'
import Cookies from 'js-cookie'
import {login} from '../utils/api'

class Login extends Component{

    state = {
        username: '',
        password: '',
        invalidLogin: false,
    }    

    handleChange(e,option) {
        this.setState({
            [option]: e.target.value
        });
    }    

    handleSubmit = async (e) => {
        e.preventDefault();
        const { users, questions, dispatch } = this.props;
        
        var userToken = await login(this.state.username,this.state.password);
        console.log('userToken handleSUmit:', userToken);
        
        
        if (typeof userToken !== 'undefined' && userToken != null && userToken.success == true) {
            console.log("userToken: ", userToken);
            const {user, token} = userToken;

            Cookies.set('id',token);
            
            dispatch(setAuthedUser(user._id));
            
            if(users == null || users.length == 0 || questions == null || questions.length == 0) {
                dispatch(setUsersQuestionsLoadReady(true))
                this.props.history.push('/home');                
            }             
        }
        else this.setState(()=>({invalidLogin: true}))
        
       
    }

    async componentDidMount(){
        
        console.log("Login componentDidMount")
        
        const { dispatch } = this.props;             
        var userId = await handleAuthenticate();
        if(userId != -1){
            dispatch(setAuthedUser(userId));
            console.log('Login in componentdidmount');
            var token = Cookies.get('id');                
            dispatch(setUsersQuestionsLoadReady(true));
            this.props.history.push('/home');
        }
    }

    render() {        

        var loginForm = this.props.usersQuestionsLoadReady == true ?  (<Redirect to='/home' />) : (
            <Fragment>
            <span className='loginFormContainer'>
                <span className='loginFormBackground'>
                <Form className='loginFormItem'>                    
                    <FormGroup controlId='formEmail'>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="user" /></InputGroup.Addon>
                            <FormControl type='text' placeholder='Login' onChange={(e)=>this.handleChange(e,'username')}></FormControl>
                        </InputGroup>                    
                    </FormGroup>
                    <FormGroup controlId='formPassword'>
                        <InputGroup>
                            <InputGroup.Addon><Glyphicon glyph="pencil" /></InputGroup.Addon>
                            <FormControl type='password' placeholder='Password' onChange={(e)=>this.handleChange(e,'password')}></FormControl>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup controlId='formButton'>
                        <Button type='submit' className='submitLoginBtn' onClick={this.handleSubmit}>
                            Sign in
                        </Button>
                    </FormGroup>                    
                </Form>
                { this.state.invalidLogin &&
                <Alert bsStyle="danger">
                    <h4 style={{marginBottom: 0}}>Invalid login</h4>
                </Alert>
            }                                
                </span>                
            </span>            
            </Fragment>
        );

        return(loginForm);
    
    }
}

function mapStateToProps({authedUser, users, questions, usersQuestionsLoadReady} ) {

    return{
        authedUser,
        users,   
        questions,
        usersQuestionsLoadReady        
    }
}

export default withRouter(connect(mapStateToProps)(Login));
