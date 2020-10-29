export default function getAllUser(state = null, action) {
    if (action.type === 'GETALLUSERS') {
        return action.users
    } else {
        return state
    }
}