import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchQuestion, fetchDataLogin, saveQuestionAnswer, loginAction } from '../actions'
import { Link } from 'react-router-dom'


export const Home = ({ user, fetchQuestion, questions, users, saveQuestionAnswer, fetchDataLogin, setNewUser }) => {
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
            <div className="list_question" >
                <div className="answers_or_not" >
                    <button style={{ color: toggle ? 'rgb(17, 186, 243)' : 'black' }}>Unanswered Questions</button>
                    <button onClick={
                        getAnswerQuestions

                    }>Answered Questions</button>
                </div>
                <div className="list" style={{ background: 'white', padding: 10, borderRadius: 10 }}>
                    {qUnAnswer && qUnAnswer.map(item => {

                        const obj = questions[item];
                        return (
                            <div key={obj.id} style={{ marginBottom: 30, borderRadius: 5, borderColor: 'gray', borderWidth: 1, borderStyle: 'dotted' }}>
                                <div>
                                    <p style={{ color: 'black', fontWeight: 'bold', textAlign: 'left', padding: 10, backgroundColor: '#F9F7F9', fontSize: 20, borderColor: 'gray', borderWidth: 1, borderBottomStyle: 'dotted' }}>{obj.author + "   asks:"}</p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                                    <img style={{ width: 100, height: 100, borderRadius: "50%" }} src={handleGetImage(obj.author)}></img>
                                    <div style={{ padding: 10, borderColor: 'gray', borderWidth: 1, borderLeftStyle: 'dotted' }}>
                                        <p style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Would you rather</p>
                                        <p style={{ color: 'gray', fontSize: 15, fontWeight: 'normal', textAlign: 'left', padding: 10, width: 200 }}>{"..." + obj.optionOne.text}</p>
                                        <Link to={{ pathname: '/Detail', value: { authedUser: user.id, qid: obj.id, users: users, questions: questions } }}>
                                            <button style={{ backgroundColor: 'white', color: 'rgb(17, 186, 243)', width: '100%', borderColor: 'rgb(17, 186, 243)', padding: 5, borderRadius: 5 }}>View Poli</button>
                                        </Link>
                                    </div>
                                </div>
                                {/* <div>
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
                                </div> */}
                            </div>
                        )
                    })}
                </div>
            </div >
        )
    } else {
        return (
            <div className="list_question">
                <div className="answers_or_not">
                    <button onClick={() => setToggle(true)}>Unanswered Questions</button>
                    <button style={{ color: !toggle ? 'rgb(17, 186, 243)' : 'black' }}>Answered Questions</button>
                </div>
                <div className="list" style={{ background: 'white', padding: 10, borderRadius: 10 }}>
                    {answer && answer.map(item => {
                        const obj = questions[item];

                        return (
                            <div key={obj.id} style={{ marginBottom: 30, borderRadius: 5, borderColor: 'gray', borderWidth: 1, borderStyle: 'dotted', backgroundColor: 'white' }}>
                                <div>
                                    <p style={{ color: 'black', fontWeight: 'bold', textAlign: 'left', padding: 10, backgroundColor: '#F9F7F9', fontSize: 20, borderColor: 'gray', borderWidth: 1, borderBottomStyle: 'dotted' }}>{obj.author + "   asks:"}</p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                                    <img style={{ width: 100, height: 100, borderRadius: "50%" }} src={handleGetImage(obj.author)}></img>
                                    <div style={{ padding: 10, borderColor: 'gray', borderWidth: 1, borderLeftStyle: 'dotted' }}>
                                        <p style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Would you rather</p>
                                        <p style={{ color: 'gray', fontSize: 15, fontWeight: 'normal', textAlign: 'left', padding: 10, width: 200 }}>{"..." + obj.optionOne.text}</p>
                                        <Link to={{ pathname: '/VoteResult', value: obj.id }}>
                                            <button style={{ backgroundColor: 'white', color: 'rgb(17, 186, 243)', width: '100%', borderColor: 'rgb(17, 186, 243)', padding: 5, borderRadius: 5 }}>View Poli</button>
                                        </Link>
                                    </div>
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
