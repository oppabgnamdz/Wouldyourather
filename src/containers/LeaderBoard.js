import React, { Component, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchDataLogin, fetchQuestion } from '../actions'
import { BarLoader } from 'react-spinners'

export const LeaderBoard = ({ users, load, user }) => {
    const [loading, setLoading] = useState(false);
    localStorage.clear()
    useEffect(() => {
        load();
        setTimeout(() => {
            setLoading(true)
        }, 1000)
    }, [])
    if (!user) {
        return (<div style={{ color: 'red' }}>404 not found</div>)
    }
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
                        <img style={{ width: 100, height: 100, borderRadius: '50%' }} src={user.avatarURL}></img>
                    </div>
                    <div className="information">
                        <h4>{user.name}</h4>
                        <div className='infor_answer infor_answer_border_bottom'>
                            <p>Answered questions</p>
                            <p style={{ marginLeft: 15 }} >{scoreAnswer}</p>
                        </div>
                        <div className='infor_answer'>
                            <p>Created questions</p>
                            <p style={{ marginLeft: 30 }}>{scoreQuestion}</p>
                        </div>
                    </div>
                </div>
                <div className="score">
                    <p className="infor_score_text">Scores</p>
                    <p className="infor_score">{totalScore}</p>

                </div>
            </div >
        )
    })
    return (
        <div style={{ background: 'white', color: 'black' }}>
            {loading ? card : (<div>
                <BarLoader size={48} width="100" color='red' />
            </div>)}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userLogin,
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
