import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { handleLogOut } from '../actions/shared'

class Nav extends Component{

    handleLogout() {
        const{ dispatch } = this.props;
        dispatch(handleLogOut());
    }

    render() {

        const { users, authedUser, questions } = this.props;
        
        var result = {};

        if (authedUser != null && authedUser != -1 && users != null && users.length != 0 && questions != null && questions.length != 0)
            result = 
                <nav className='nav'>
                <ul>
                    <span className='navcontainer'>
                        <span className=' navcontainer1'>
                            <li>
                            <NavLink to='/home' exact activeClassName='activeLink' >
                                Home
                            </NavLink>
                            </li>
                            <li>
                            <NavLink to='/home/add' activeClassName='activeLink'>
                                New Question
                            </NavLink>
                            </li>
                            <li>
                            <NavLink to='/home/leaderboard' activeClassName='activeLink'>
                                Leader Board
                            </NavLink>
                            </li>
                        </span>
                        <span className= 'authedUser'>
                            <li>
                                {console.log(`Nave users ${users}`)}
                                Hello {users.filter(user => user._id ==authedUser)[0].name}
                            </li>
                            <li>
                                <NavLink to='/login' exact activeClassName='activeLink' onClick={()=>{this.handleLogout();}}>
                                    Logout                                    
                                </NavLink>
                            </li>
                        </span>
                    </span>
                </ul>
            </nav>;
        else result = <span></span>;

        return (result);
    }
}

function mapStateToProps({ authedUser, users, questions }) {    
    return{
        authedUser,
        users,
        questions
    }
}

export default connect(mapStateToProps)(Nav);
