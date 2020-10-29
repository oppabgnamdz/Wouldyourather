import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginAction } from '../actions'
import { LeaderBoard } from './LeaderBoard'
import { NewQuestion } from './NewQuestion'

export const Navigation = ({ stateLogin, logOut }) => {
    console.log(!stateLogin)
    const RenderSignout = () => {
        if (!stateLogin) return <div></div>
        else {
            return (
                <Link onClick={() => { logOut() }} to='/'>
                    <li>Sign out</li>
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
    console.log(state.userLogin)
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
