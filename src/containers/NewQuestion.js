import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { saveQuestion } from '../actions'
import PageError from './PageError';
import { Link, Redirect } from 'react-router-dom'

export const NewQuestion = ({ saveQuestion, userName }) => {
    localStorage.clear();
    const [optionOne, setOptionOne] = useState();
    const [optionTwo, setOptionTwo] = useState();
    if (!userName) {
        return (<PageError />)
    }
    function handleOptionOne(e) {
        const text = e.target.value;
        setOptionOne(text)
    }
    function handleOptionTwo(e) {
        const text = e.target.value;
        setOptionTwo(text)
    }
    function handleSubmit() {
        saveQuestion({ optionOneText: optionOne, optionTwoText: optionTwo, author: userName })
        // alert('them thanh cong')
        // return (
        //     < Redirect from='/NewQuestion' to='/' />
        // )

    }
    return (
        <div className='form' style={{ background: 'white', color: 'black', borderRadius: 5, borderColor: 'gray', borderWidth: 1, borderStyle: 'dotted' }}>
            <h3 style={{ color: 'black', fontWeight: 'bold', textAlign: 'left', paddingTop: 10, paddingBottom: 10, paddingLeft: 50, paddingRight: 50, margin: 0, backgroundColor: '#F9F7F9', borderColor: 'gray', borderWidth: 1, borderBottomStyle: 'dotted' }}>Create New Question</h3>
            <p style={{ textAlign: 'left', padding: 10 }}>Complete the question:</p>
            <h4 style={{ textAlign: 'left', padding: 10 }} >Would you rather ...</h4>
            <input placeholder='Enter Option Two Text Here' onChange={handleOptionOne} style={{ padding: 20, width: '90%', boxSizing: 'border-box' }} ></input>
            <h4 >OR</h4>
            <input placeholder='Enter Option Two Text Here' onChange={handleOptionTwo} style={{ padding: 20, width: '90%', boxSizing: 'border-box' }}></input>
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
