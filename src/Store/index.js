import React, { createContext, useReducer } from 'react'
import Reducer from './reducer'

let initialState = {
  loggedInUser: {},
  onlineUsers: [],
  token: null,
}

const loggedInUserData = JSON.parse(localStorage.getItem('chatio-payload'))
// console.log('user loged data', loggedInUserData)
if (loggedInUserData) {
  console.log('loggedin', loggedInUserData)
  const { token, loggedInUser } = loggedInUserData
  initialState = {
    loggedInUser: loggedInUser,
    onlineUsers: [].concat(loggedInUser),
    token,
  }
}

export const Context = createContext(initialState)

const Store = ({ children }) => {
  const { Provider } = Context
  const [state, dispatch] = useReducer(Reducer, initialState)
  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export default Store
