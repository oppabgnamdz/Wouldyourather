import { combineReducers } from "redux";
import userLogin from './login'
import GetAllUser from './GetAllUser'
import GetAllQuestion from './GetAllQuestion'
const allReducer = combineReducers({
    userLogin,
    GetAllUser,
    GetAllQuestion
})
export default allReducer