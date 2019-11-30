import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, DropdownButton, MenuItem} from 'react-bootstrap'
import image from '../assets/colorful_wall.jpg'
import { setAuthedUser } from '../actions/authedUser'

import { withRouter } from 'react-router-dom'

class Login extends Component{

    menuItems = () => {
        const {dispatch, users, formerLocation} = this.props;
        
        var userIds = Object.keys(users);

        var result = userIds.map( (id) => (
            <MenuItem key={users[id]._id}
                eventKey={users[id]._id}
                className="selectUserMenuItem"
                onSelect={()=> {
                    dispatch(setAuthedUser(users[id]._id));
                    this.props.history.push(formerLocation);
                }}>
                {users[id].name}
            </MenuItem>
        ))

        return result;
    }

    render() {

        return(
            <Panel className="questionPanel">
                <Panel.Heading className="loginHeader">
                    <h3><b>Welcome to the Would You Rather App!</b></h3>
                    <h4>Please sign in to continue.</h4>
                </Panel.Heading>
                <Panel.Body className="signIn">
                    <img
                        src={image}
                        alt={`wall`}
                        className='wallImage'
                    />

                    <DropdownButton title="Sign In"
                        className="submitBtn selectUser"
                        id="dropDown">
                        {this.menuItems()}
                    </DropdownButton>
                </Panel.Body>
            </Panel>
        )
    }
}

function mapStateToProps({authedUser, users}, {formerLocation}) {

    return{
        users,
        authedUser,
        formerLocation
    }
}

export default withRouter(connect(mapStateToProps)(Login));
