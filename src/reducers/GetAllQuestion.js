export default function GetAllQuestion(state = null, action) {
    if (action.type === 'GETALLQUESTIONS') {
        return action.question
    } else {
        return state
    }
}