import React, { Component } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import './App.css'
import Nav from './Nav'
import Dashboard from './Dashboard'
import Positions from './Positions'
import Login from './Login'

class App extends Component {
  currencyFormat (num) {
    return num.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  }

  render () {
    return (
      <div className='App'>
        <Nav />
        <main>
          <Switch>
            <Route exact path='/' render={() => (
              <Dashboard currencyFormat={this.currencyFormat} />
            )} />
            <Route exact path='/login' render={() => (
              <Login />
            )} />
            <Route exact path='/positions' render={() => (
              <Positions currencyFormat={this.currencyFormat} />
            )} />
            <Route path='/*' render={() => (<Redirect to='/' />)} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
