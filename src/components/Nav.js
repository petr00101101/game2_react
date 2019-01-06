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
                            {/*
                              <NavLink to='/questions' exact activeClassName='activeLink' >
                          */}
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
                                Hello {users[authedUser].name}
                            </li>
                            <li>
                            {/*
                                <NavLink to='/' exact activeClassName='activeLink' onClick={()=>{dispatch(setAuthedUser(null))}}>
                            */}
                                <NavLink to='/login' exact activeClassName='activeLink' onClick={()=>{dispatch(setAuthedUser(null))}}>
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
