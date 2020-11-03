import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { useLocation, Link, Redirect } from 'react-router-dom'
import { saveQuestionAnswer } from '../actions'
import PageError from './PageError'

export const Detail = ({ saveQuestionAnswer, user, match }) => {
    localStorage.setItem('check', match.params.id)
    const [valueOption, setValueOption] = useState([]);
    const [objMultiple, setObjMultiple] = useState(new Map());


    const [multiple, setMultiple] = useState(false);
    let valueParam = useLocation().value;
    if (!user) {
        return (<div>
            < Redirect from='/VoteResult' to='/' />
        </div>)
    }
    let users = valueParam.users;
    let obj = valueParam.questions[valueParam.qid]
    function handleGetImage(name) {
        return users[name].avatarURL
    }
    function getOption(e) {


        if (e.target.type === 'radio') {
            const clone = []
            clone.push(e.target.value)
            setValueOption(clone)
        }
        if (e.target.type === 'checkbox') {
            const clone = []
            let isChecked = e.target.checked;
            let item = e.target.value;
            setObjMultiple(objMultiple.set(item, isChecked));
            objMultiple.forEach((value, key) => {

                if (value === true) {
                    clone.push(key)
                }
            })
            setValueOption(clone)
        }



    }
    function getMultiple(e) {
        const choose = e.target.value
        if (choose === 'multiple') {
            setMultiple(true)
        } else {
            setMultiple(false)
        }
    }
    function handleSaveAnswerQuestion() {
        if (valueOption) {
            saveQuestionAnswer({ authedUser: valueParam.authedUser, qid: valueParam.qid, answer: valueOption })
        }

    }
    return (
        <div>
            <div key={obj.id} style={{ marginBottom: 30, borderRadius: 5, borderColor: 'gray', borderWidth: 1, borderStyle: 'dotted', backgroundColor: 'white' }}>
                <div>
                    <p style={{ color: 'black', fontWeight: 'bold', textAlign: 'left', padding: 10, backgroundColor: '#F9F7F9', fontSize: 20, borderColor: 'gray', borderWidth: 1, borderBottomStyle: 'dotted' }}>{obj.author + "   asks:"}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
                    <img style={{ width: 100, height: 100, borderRadius: "50%" }} src={handleGetImage(obj.author)}></img>
                    <div style={{ padding: 10, borderColor: 'gray', borderWidth: 1, borderLeftStyle: 'dotted' }}>
                        <p style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Would you rather</p>
                        <p style={{ color: 'black', fontSize: 15, fontWeight: 'lighter' }}>Choose your option</p>
                        <div onChange={getMultiple} style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div style={{}}>
                                <input type="radio" value='multiple' name="option" id='option1' />
                                <label htmlFor='option1' style={{ color: 'gray', fontSize: 15, fontWeight: 'normal', textAlign: 'left', padding: 10, width: 200 }}>Multiple</label>
                            </div>
                            <div style={{}}>
                                <input defaultChecked type="radio" value='single' name="option" id='option2' />
                                <label htmlFor='option2' style={{ color: 'gray', fontSize: 15, fontWeight: 'normal', textAlign: 'left', padding: 10, width: 200 }}>Single</label>
                            </div>
                        </div>

                        <div style={{ borderTopStyle: 'solid', borderWidth: 1, borderColor: 'aqua', marginTop: 10 }} onChange={getOption}>

                            {!multiple &&
                                Object.keys(obj.options).map((item, index) => {
                                    return (
                                        <div key={index} style={{ width: 300 }}>
                                            <input type="radio" value={item} name="option" id={item} />
                                            <label htmlFor={item} style={{ color: 'gray', fontSize: 15, fontWeight: 'normal', textAlign: 'left', padding: 10, width: 200 }}>{"..." + obj.options[item].text}</label>
                                        </div>
                                    )
                                })
                            }
                            {multiple &&
                                Object.keys(obj.options).map((item, index) => {
                                    return (
                                        <div key={index} style={{ width: 300 }}>
                                            <input type="checkbox" value={item} name="option" id={item} />
                                            <label htmlFor={item} style={{ color: 'gray', fontSize: 15, fontWeight: 'normal', textAlign: 'left', padding: 10, width: 200 }}>{"..." + obj.options[item].text}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <Link to={{ pathname: `/VoteResult/${valueParam.qid}`, value: valueParam.qid }} onClick={handleSaveAnswerQuestion}>
                            <button style={{ backgroundColor: 'white', color: 'rgb(17, 186, 243)', width: '100%', borderColor: 'rgb(17, 186, 243)', padding: 5, borderRadius: 5 }}>Submit</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userLogin,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveQuestionAnswer: (obj) => {
            dispatch(saveQuestionAnswer(obj))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
