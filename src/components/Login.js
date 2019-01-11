import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Panel, DropdownButton, MenuItem} from 'react-bootstrap'
import CatImage from '../kittenclipart.gif'
import { setAuthedUser } from '../actions/authedUser'

import { withRouter } from 'react-router-dom'

class Login extends Component{

    menuItems = () => {
        const {dispatch, users, authedUser, formerLocation} = this.props;

        var userIds = Object.keys(users);

        var result = userIds.map( (id) => (
            <MenuItem key={id}
                eventKey={id}
                className="selectUserMenuItem"
                onSelect={()=> {
                    dispatch(setAuthedUser(id));
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
                        src={CatImage}
                        alt={`Cat`}
                        className='CatImage'
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
