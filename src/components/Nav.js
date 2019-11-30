import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component{

    render() {

        const { dispatch, users, authedUser } = this.props;

        return (
            <nav className='nav'>
                <ul>
                    <span className='navcontainer'>
                        <span className=' navcontainer1'>
                            <li>
                              <NavLink to='/' exact activeClassName='activeLink' >
                                Home
                              </NavLink>
                            </li>
                            <li>
                              <NavLink to='/add' activeClassName='activeLink'>
                                New Question
                              </NavLink>
                            </li>
                            <li>
                              <NavLink to='/leaderboard' activeClassName='activeLink'>
                                Leader Board
                              </NavLink>
                            </li>
                        </span>
                        <span className= 'authedUser'>
                            <li>
                                Hello {users.filter(user => user._id ==authedUser)[0].name}
                            </li>
                            <li>
                                <NavLink to='/' exact activeClassName='activeLink' onClick={()=>{dispatch(setAuthedUser("-1"))}}>
                                    Logout
                                </NavLink>
                            </li>
                        </span>
                    </span>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({ authedUser, users }) {    
    return{
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Nav);
