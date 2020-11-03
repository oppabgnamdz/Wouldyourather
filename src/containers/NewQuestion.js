import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { saveQuestion } from '../actions'
import PageError from './PageError';
import { Link, Redirect } from 'react-router-dom'

export const NewQuestion = ({ saveQuestion, userName }) => {
    localStorage.clear();
    const [answers, setAnswers] = useState();
    const [arrQuestion, setArrQuestion] = useState([]);
    const [objText, setObjText] = useState();
    if (!userName) {
        return (<PageError />)
    }

    function handleSubmit() {
        saveQuestion({ options: objText, author: userName })


    }
    function handleGetAnswers(e) {
        setAnswers(e.target.value)
    }
    function handleCreateArrQuestion() {
     

        const clone = []
        for (let i = 0; i < answers; i++) {
            let random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            clone.push(random);
        }
        setArrQuestion(clone)
    }
    function handleText(e) {
        let value = e.target.value;
        let type = e.target.name;
        setObjText({ ...objText, [type]: { votes: [], text: value } })
    }
    return (
        <div className='form' style={{ background: 'white', color: 'black', borderRadius: 5, borderColor: 'gray', borderWidth: 1, borderStyle: 'dotted' }}>
            <h3 style={{ color: 'black', fontWeight: 'bold', textAlign: 'left', paddingTop: 10, paddingBottom: 10, paddingLeft: 50, paddingRight: 50, margin: 0, backgroundColor: '#F9F7F9', borderColor: 'gray', borderWidth: 1, borderBottomStyle: 'dotted' }}>Create New Question</h3>
            <p style={{ textAlign: 'left', padding: 10 }}>Complete the question:</p>
            <div style={{ display: 'flex', marginBottom: 20 }}>
                <h4 style={{ textAlign: 'left', padding: 5 }} >Would you rather ...</h4>
                <div>
                    <input onChange={handleGetAnswers} placeholder='How many choise ?' style={{ padding: 5, width: '100%', boxSizing: 'border-box' }} ></input>
                    <button onClick={handleCreateArrQuestion} style={{ background: 'lightgreen', width: "100%", height: 40, border: 'none', marginTop: 20 }}>Confirm</button>
                </div>

            </div>
            {arrQuestion.map((item, index) => (<input placeholder={`Your choise ${index + 1}`} style={{ display: 'block', padding: 5, width: '90%', boxSizing: 'border-box', margin: 'auto', marginTop: 10 }} name={item} key={index} onChange={handleText}></input>))}
            <Link to="/Home">
                <button onClick={handleSubmit} style={{ background: 'lightgreen', width: "100%", height: 40, border: 'none', marginTop: 20 }}>Submit</button>
            </Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    if (state.userLogin) {
        return {
            userName: state.userLogin.id,

        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveQuestion: (obj) => {
            dispatch(saveQuestion(obj))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion)
