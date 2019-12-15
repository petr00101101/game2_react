import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Panel, DropdownButton, MenuItem} from 'react-bootstrap'
import { Form, FormGroup, FormControl, Button, InputGroup, Glyphicon, Grid } from 'react-bootstrap';
// import image from '../assets/colorful_wall.jpg'
import { setAuthedUser } from '../actions/authedUser'
import '../index.css';
import { withRouter } from 'react-router-dom'
import { Auth } from './PrivateRoute'

class Login extends Component{

    // menuItems = () => {
    //     const {dispatch, users, formerLocation} = this.props;
        
    //     var userIds = Object.keys(users);

    //     var result = userIds.map( (id) => (
    //         <MenuItem key={users[id]._id}
    //             eventKey={users[id]._id}
    //             className="selectUserMenuItem"
    //             onSelect={()=> {
    //                 dispatch(setAuthedUser(users[id]._id));
    //                 this.props.history.push(formerLocation);
    //             }}>
    //             {users[id].name}
    //         </MenuItem>
    //     ))

    //     return result;
    // }

    state = {
        username: '',
        password: ''
    }    

    handleChange(e,option) {
        this.setState({
            [option]: e.target.value
        });
    }    

    handleSubmit(e) {
        e.preventDefault();
        // dispatch(/*setAuthedUser(users[id]._id)*/);
        
        // if authorized 
        //     this.props.history.push('/');

    }

    render() {

        var loginForm = (
            
            <span className='loginFormContainer'>
                <span className='loginFormBackground'>
                <Form  className='loginFormItem'>
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
                </span>
            </span>
            
        );

        return(loginForm);

        // return(
        //     <Panel className="questionPanel container">
        //         <Panel.Heading className="loginHeader">
        //             <h3><b>Welcome to the Would You Rather App!</b></h3>
        //             <h4>Please sign in to continue.</h4>
        //         </Panel.Heading>
        //         <Panel.Body className="signIn">
        //             <img
        //                 src={image}
        //                 alt={`wall`}
        //                 className='wallImage'
        //             />

        //             <DropdownButton title="Sign In"
        //                 className="submitBtn selectUser"
        //                 id="dropDown">
        //                 {this.menuItems()}
        //             </DropdownButton>
        //         </Panel.Body>
        //     </Panel>
        // )
    }
}

function mapStateToProps({authedUser, users} /*, {formerLocation}*/) {

    return{
        users,
        authedUser,
        // formerLocation
    }
}

export default withRouter(connect(mapStateToProps)(Login));
