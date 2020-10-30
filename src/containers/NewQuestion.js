import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { saveQuestion } from '../actions'

export const NewQuestion = ({ saveQuestion, userName }) => {
    const [optionOne, setOptionOne] = useState();
    const [optionTwo, setOptionTwo] = useState();
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
        alert('them thanh cong')
    }
    return (
        <div className='form' style={{ background: 'black', color: 'red' }}>
            <h2>Create New Question</h2>
            <p style={{ textAlign: 'left' }}>Complete the question:</p>
            <h4 style={{ textAlign: 'left' }} >Would you rather ...</h4>
            <input onChange={handleOptionOne} style={{ padding: 20 }} placeholder="Enter options one text here"></input>
            <h4>OR</h4>
            <input onChange={handleOptionTwo} style={{ padding: 20 }} placeholder="Enter options two text here"></input>
            <button onClick={handleSubmit} style={{ background: 'lightgreen', width: "100%", height: 40, border: 'none', }}>Submit</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userName: state.userLogin.id,
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
