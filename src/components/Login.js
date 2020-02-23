import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, FormControl, Button, InputGroup, Glyphicon, Alert, Grid, Row, Col } from 'react-bootstrap';
import { setAuthedUser } from '../actions/authedUser'
import '../index.css';
import { withRouter, Redirect } from 'react-router-dom'
import { setUsersQuestionsLoadReady, handleAuthenticate } from '../actions/shared.js'
import Cookies from 'js-cookie'
import { login } from '../utils/api'
import { setTokenExpired } from '../actions/tokenExpired'

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

    handleKeyPress = (e) => {
        if(e.key === 'Enter'){
            this.handleSubmit(e);
        }
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
            dispatch(setTokenExpired(false));
            
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
        
        let result = await handleAuthenticate();        
        if(result != -1){
            dispatch(setAuthedUser(result.id));
            
            console.log('Login in componentdidmount');
            
            dispatch(setUsersQuestionsLoadReady(true));
            this.props.history.push('/home');
        }
    }

    render() {        

        var loginForm = this.props.usersQuestionsLoadReady == true ?  (<Redirect to='/home' />) : (
            <Fragment>
                <Grid>
                    <Row>
                        <Col xs={12} mdHidden={true} lgHidden={true}>
                            <span className='loginFormContainer'>
                            <Form className='loginFormItemSmall'>                    
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
                                <Button type='submit' bsClass='submitLoginBtn' onClick={this.handleSubmit} onKeyPress={this.handleKeyPress}>
                                        Sign in
                                    </Button>
                                </FormGroup>
                                { this.state.invalidLogin &&
                                    <Alert bsStyle="danger">
                                        <h4 style={{marginBottom: 0}}>Invalid login</h4>
                                    </Alert>
                                }{  this.props.tokenExpired &&
                                    <Alert bsStyle="info">
                                        <h4 style={{marginBottom: 0}}>Session Timeout</h4>
                                    </Alert>
                                }                    
                            </Form>
                            </span>
                        </Col>
                    </Row>
                    <Row>

                        <Col md={3} lg={3} xsHidden={true} smHidden={true}/>
                        <Col md={6} lg={6} xsHidden={true} smHidden={true}>
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
                                    <Button type='submit' bsClass='submitLoginBtn' onClick={this.handleSubmit} onKeyPress={this.handleKeyPress}>
                                        Sign in
                                    </Button>
                                </FormGroup>                    
                                { this.state.invalidLogin &&
                                    <Alert bsStyle="danger">
                                        <h4 style={{marginBottom: 0}}>Invalid login</h4>
                                    </Alert>
                                }{  this.props.tokenExpired &&
                                    <Alert bsStyle="info">
                                        <h4 style={{marginBottom: 0}}>Session Timeout</h4>
                                    </Alert>
                                }
                            </Form>
                                                            
                            </span>                
                            </span>
                        </Col>                        
                        <Col md={3} lg={3} xsHidden={true} smHidden={true}/>                                                
                    </Row>
                </Grid>
            </Fragment>
        );

        return(loginForm);
    
    }
}

function mapStateToProps({authedUser, users, questions, usersQuestionsLoadReady, tokenExpired }) {

    return{
        authedUser,
        users,   
        questions,
        usersQuestionsLoadReady,
        tokenExpired                
    }
}

export default withRouter(connect(mapStateToProps)(Login));
