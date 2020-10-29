import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchQuestion, fetchDataLogin, saveQuestionAnswer, loginAction } from '../actions'
import { Link } from 'react-router-dom'

export const Home = ({ user, fetchQuestion, questions, users, saveQuestionAnswer, fetchDataLogin, setNewUser }) => {
    console.log('render');

    const [toggle, setToggle] = useState(true);
    const [answer, setAnswer] = useState(null);

    let qUnAnswer = null;
    useEffect(() => {
        fetchQuestion()
        fetchDataLogin()
    }, [toggle])
    function handleRender() {
        let filter = Object.keys(questions).filter(item => {
            if (Object.keys(user.answers).indexOf(item) == -1) {
                return true
            } else {
                return false
            }
        })
        qUnAnswer = filter
    }
    if (questions && toggle == true) {
        handleRender();
    }
    function handleGetImage(name) {
        return users[name].avatarURL
    }
    async function getAnswerQuestions() {


        let filter = Object.keys(questions).filter(item => {
            if (Object.keys(user.answers).indexOf(item) !== -1) {
                return true
            } else {
                return false
            }
        })
        setAnswer(filter)

        setToggle(false)
    }

    if (toggle) {

        return (
            <div className="list_question">
                <div className="answers_or_not">
                    <button>Unanswered Questions</button>
                    <button onClick={
                        getAnswerQuestions

                    }>Answered Questions</button>
                </div>
                <div className="list" style={{ background: 'black' }}>
                    {qUnAnswer && qUnAnswer.map(item => {
                        const obj = questions[item];
                        return (
                            <div key={obj.id} style={{ marginBottom: 30, background: 'orange' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <img style={{ width: 150, height: 150, borderRadius: "100%" }} src={handleGetImage(obj.author)}></img>
                                    <p>Would you rather</p>
                                </div>
                                <div>
                                    <Link to='/Home' onClick={() => {

                                        saveQuestionAnswer({ authedUser: user.id, qid: obj.id, answer: 'optionOne' })
                                        alert('Đã thêm câu trả lời')
                                    }}>
                                        <div>
                                            {obj.optionOne.text}
                                        </div>
                                    </Link>


                                    <Link to='/Home' onClick={() => {
                                        saveQuestionAnswer({ authedUser: user.id, qid: obj.id, answer: 'optionTwo' })
                                        alert('Đã thêm câu trả lời')
                                    }}>
                                        <div >{obj.optionTwo.text}</div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div className="list_question">
                <div className="answers_or_not">
                    <button onClick={() => setToggle(true)}>Unanswered Questions</button>
                    <button>Answered Questions</button>
                </div>
                <div className="list" style={{ background: 'black' }}>
                    {answer && answer.map(item => {
                        const obj = questions[item];
                        console.log(obj)
                        let Choose = obj.optionOne.votes.indexOf(user.id)
                        let check = obj.optionTwo.votes.indexOf(user.id)
                        console.log(Choose)
                        if (Choose !== -1) {
                            Choose = () => {
                                return (
                                    <div>{obj.optionOne.text}</div>
                                )
                            }
                        } else {
                            Choose = () => {
                                return (
                                    <div>{obj.optionTwo.text}</div>
                                )
                            }
                        }
                        return (
                            <div key={obj.id} style={{ marginBottom: 30, background: 'orange' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <img style={{ width: 150, height: 150, borderRadius: "100%" }} src={handleGetImage(obj.author)}></img>
                                    <p>Would you rather</p>
                                </div>
                                <div>
                                    <Choose />
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }

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
        saveQuestionAnswer: (obj) => {
            dispatch(saveQuestionAnswer(obj))
        },
        setNewUser: (u) => {
            dispatch(loginAction(u))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
