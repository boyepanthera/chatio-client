import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Conversation from './components/Conversation'
import Login from './components/Login'
import Register from './components/Register'

const App = () => (
  <Router>
    <Switch>
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/conversation'>
        <Conversation />
      </Route>
      <Route path='/'>
        <Login />
      </Route>
    </Switch>
  </Router>
)

export default App
