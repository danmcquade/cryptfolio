import React, { Component } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import './App.css'
import Nav from './Nav'
import Dashboard from './Dashboard'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Nav />
        <main>
          <Switch>
            <Route exact path='/' render={() => (
              <Dashboard />
            )} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
