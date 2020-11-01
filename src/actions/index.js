import { LOGIN, GETALLQUESTIONS, GETALLUSERS, SAVEQUESTION } from './actionType'

import * as Data from '../_Data'
export const loginAction = (login) => {
    return {
        type: LOGIN,
        login
    }
}
export const getAllUsers = (users) => {
    return {
        type: GETALLUSERS,
        users
    }
}
export const fetchDataLogin = () => {
    return dispatch => {
        Data._getUsers().then(users => {
            dispatch(getAllUsers(users))
        })
    }
}
export const getAllQuestions = (question) => {
    return {
        type: GETALLQUESTIONS,
        question
    }
}
export const fetchQuestion = () => {
    return dispatch => {
        Data._getQuestions().then(questions => {
            dispatch(getAllQuestions(questions))
        })
    }
}
export const saveQuestionAnswer = ({ authedUser, qid, answer }) => {
    return dispatch => {
        Data._saveQuestionAnswer({ authedUser, qid, answer }).then(resolve => {
            console.log('save quesion answer')
            dispatch(loginAction(Data.users[authedUser]))
        })
    }
}
export const saveQuestion = (question) => {
    return dispatch => {
        Data._saveQuestion(question).then(resolve => {
        })
    }
}
