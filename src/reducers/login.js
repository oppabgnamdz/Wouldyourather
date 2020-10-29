import { LOGIN } from '../actions/actionType'
export default function userLogin(state = null, action) {
    switch (action.type) {
        case LOGIN:
            return action.login
        default:
            return state
    }

}