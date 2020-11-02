import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginAction } from '../actions'


export const Navigation = ({ stateLogin, logOut }) => {
    const RenderSignout = () => {
        if (!stateLogin) return <div></div>
        else {
            return (
                <Link onClick={() => {
                    logOut()
                    localStorage.clear();
                }} to='/'>
                    <div className='signout_hover' style={{ display: 'flex' }}>
                        <img style={{ width: 40, height: 40, borderRadius: '50%' }} src={stateLogin.avatarURL}></img>
                        <li style={{ color: 'red' }}>{stateLogin.name}</li>
                        <li>Sign out</li>
                    </div>
                </Link>
            )
        }
    }
    function homeClick(e) {
        if (!stateLogin) {
            e.preventDefault();
        }
    }
    function LeaderBoardClick(e) {
        if (!stateLogin) {
            e.preventDefault();
        }
    }
    function NewQuestionClick(e) {
        if (!stateLogin) {
            e.preventDefault();
        }
    }
    return (
        <ul className="navigation">
            <Link onClick={homeClick} to='/Home'>
                <li>Home</li>
            </Link>
            <Link onClick={LeaderBoardClick} to='LeaderBoard'>
                <li>Leader Board</li>
            </Link>
            <Link onClick={NewQuestionClick} to='NewQuestion'>
                <li>New Question</li>
            </Link>
            <RenderSignout />
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        stateLogin: state.userLogin
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logOut: () => {
            dispatch(loginAction(null))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
