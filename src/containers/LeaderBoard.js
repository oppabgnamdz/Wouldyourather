import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchDataLogin, fetchQuestion } from '../actions'

export const LeaderBoard = ({ users, load }) => {
    useEffect(() => {
        load();
    }, [])
    const listDefault = Object.keys(users)
    const listSort = listDefault.sort(function (a, b) {
        const userA = users[a];
        const userB = users[b];
        const totalScoreA = Object.keys(userA.answers).length + userA.questions.length
        const totalScoreB = Object.keys(userB.answers).length + userB.questions.length

        return totalScoreB - totalScoreA
    })

    const card = listSort.map(item => {
        const user = users[item]
        const totalScore = Object.keys(user.answers).length + user.questions.length
        const scoreAnswer = Object.keys(user.answers).length;
        const scoreQuestion = user.questions.length
        return (
            <div key={user.id} className="card">
                <div className="infor">
                    <div style={{ alignItems: 'center', display: 'flex' }}>
                        <img style={{ width: 100, height: 100 }} src={user.avatarURL}></img>
                    </div>
                    <div>
                        <h4>{user.name}</h4>
                        <div className='infor_answer'>
                            <p>Answered questions</p>
                            <p style={{ marginLeft: 15 }} >{scoreAnswer}</p>
                        </div>
                        <div className='infor_createQ'>
                            <p>Created questions</p>
                            <p style={{ marginLeft: 30 }}>{scoreQuestion}</p>
                        </div>
                    </div>
                </div>
                <div className="score">
                    <p>Scores</p>
                    <p>{totalScore}</p>

                </div>
            </div >
        )
    })
    return (
        <div style={{ background: 'lightgreen', color: 'black' }}>
            {card}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        users: state.GetAllUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: () => {
            dispatch(fetchDataLogin())
            dispatch(fetchQuestion())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard)
