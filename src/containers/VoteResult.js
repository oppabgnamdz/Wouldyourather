import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchQuestion, fetchDataLogin } from '../actions'
import { Redirect, useLocation, } from 'react-router-dom'
import logo from '../images/check.png'
import { BarLoader } from 'react-spinners'

export const VoteResult = ({ user, users, questions, fetchDataLogin, fetchQuestion, match }) => {
    localStorage.setItem('check', match.params.id)
    let qid = useLocation().value;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDataLogin();
        fetchQuestion();
        setTimeout(() => {
            setLoading(true)
        }, 1000)
    }, [])
    if (!user) {
        return (<div>
            <div style={{ color: 'red' }}>404 not found</div>
            < Redirect from='/VoteResult' to='/' />
        </div>)
    }
    const vote1Number = questions[qid].optionOne.votes.length;
    const vote2Number = questions[qid].optionTwo.votes.length;
    const totalVote = vote1Number + vote2Number;
    const choose = user.answers[qid] === 'optionOne' ? true : false
    return (
        <div style={{ marginBottom: 30, borderRadius: 5, borderColor: 'gray', borderWidth: 1, borderStyle: 'dotted' }} >
            {loading ? (
                <div>
                    <div>
                        <p style={{ color: 'black', fontWeight: 'bold', textAlign: 'left', padding: 10, backgroundColor: '#F9F7F9', fontSize: 20, borderColor: 'gray', borderWidth: 1, borderBottomStyle: 'dotted' }}>{"Asked by " + user.name}</p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img style={{ width: 100, height: 100, borderRadius: "50%" }} src={user.avatarURL}></img>
                        </div>
                        <div style={{ padding: 10, borderColor: 'gray', borderWidth: 1, borderLeftStyle: 'dotted' }}>
                            <p style={{ color: 'black', fontSize: 20, fontWeight: 'bold', textAlign: 'left' }}>Results:</p>
                            {/* <p style={{ color: 'gray', fontSize: 15, fontWeight: 'normal', textAlign: 'left', padding: 10, width: 200 }}>Mytext</p> */}
                            <div style={{ backgroundColor: choose ? 'cyan' : 'white', borderColor: 'gray', borderWidth: 1, borderStyle: 'solid', borderRadius: 10, marginTop: 10, position: 'relative' }}>
                                <p style={{ color: 'black', fontSize: 15, fontWeight: 'bold', textAlign: 'left', padding: 10, width: 220 }}>{"Would you rather " + questions[qid].optionOne.text + " ?"}</p>
                                <div style={{ backgroundColor: '#F9F7F9', width: '100%', height: 30 }}>
                                    <div style={{ backgroundColor: 'lightgreen', width: `${(vote1Number / totalVote) * 100}%`, height: 30, fontSize: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <span> {`${parseFloat((vote1Number / totalVote) * 100).toFixed(2)}%`}</span>
                                    </div>
                                </div>
                                <p style={{ color: 'black', fontSize: 20, marginTop: 10 }}>{vote1Number + " of " + totalVote + " votes"}</p>
                                <img style={{ width: 30, height: 30, position: 'absolute', top: 0, right: 0, display: choose ? 'block' : 'none', borderTopRightRadius: 10 }} src={logo} />
                            </div>
                            <div style={{ backgroundColor: choose ? 'white' : 'cyan', borderColor: 'gray', borderWidth: 1, borderStyle: 'solid', marginTop: 20, borderRadius: 10, position: 'relative' }}>
                                <p style={{ color: 'black', fontSize: 15, fontWeight: 'bold', textAlign: 'left', padding: 10, width: 220 }}>{"Would you rather " + questions[qid].optionTwo.text + " ?"}</p>
                                <div style={{ backgroundColor: '#F9F7F9', width: '100%', height: 30 }}>
                                    <div style={{ backgroundColor: 'lightgreen', width: `${(vote2Number / totalVote) * 100}%`, height: 30, fontSize: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <span>{`${parseFloat((vote2Number / totalVote) * 100).toFixed(2)}%`}</span>
                                    </div>
                                </div>
                                <p style={{ color: 'black', fontSize: 20, marginTop: 10 }}>{vote2Number + " of " + totalVote + " votes"}</p>

                                <img style={{ width: 30, height: 30, position: 'absolute', top: 0, right: 0, display: choose ? 'none' : 'block', borderTopRightRadius: 10 }} src={logo} />
                            </div>

                        </div>
                    </div>
                </div>
            ) : (<div>
                <BarLoader size={48} width="100" color='red' />
            </div>)}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userLogin,
        questions: state.GetAllQuestion,
        users: state.GetAllUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchQuestion: () => {
            dispatch(fetchQuestion())
        },
        fetchDataLogin: () => {
            dispatch(fetchDataLogin())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteResult)
