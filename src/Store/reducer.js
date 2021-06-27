import { loginUser, logoutUser } from './actionTypes'
const Reducer = (state, action) => {
  switch (action.type) {
    case loginUser:
      const { loggedInUser, token } = action.payload
      return {
        ...state,
        onlineUsers: state.onlineUsers.concat(loggedInUser),
        loggedInUser,
        token,
      }
    case logoutUser:
      const { loggedOutUser } = action.payload
      return {
        ...state,
        onlineUsers: state.onlineUsers.filter(
          (user) => user._id !== loggedOutUser._id
        ),
      }
    default:
      return state
  }
}

export default Reducer
