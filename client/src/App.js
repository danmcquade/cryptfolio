import React, { Component } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import './App.css'
import AddPosition from './AddPosition'
import Dashboard from './Dashboard'
import EditPosition from './EditPosition'
import Login from './Login'
import Nav from './Nav'
import Positions from './Positions'

class App extends Component {
  constructor () {
    super()
    this.state = {
      loggedIn: false
    }
    this.setLoginState = this.setLoginState.bind(this)
  }

  currencyFormat (num) {
    return num.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  }

  componentDidMount () {
    if (!localStorage.getItem('cryptfolio-jwt')) {
      console.log('Not logged in')
    } else {
      console.log('We have a token!')
      this.setState({loggedIn: true})
    }
  }

  setLoginState (state) {
    this.setState({
      loggedIn: state
    })
  }

  render () {
    return (
      <div className='App'>
        <Nav loggedIn={this.state.loggedIn} setLoginState={this.setLoginState} />
        <main>
          <Switch>
            <Route exact path='/' render={() => (
              <Dashboard currencyFormat={this.currencyFormat} />
            )} />
            <Route exact path='/login' render={() => (
              <Login setLoginState={this.setLoginState} />
            )} />
            <Route exact path='/positions' render={(props) => (
              <Positions currencyFormat={this.currencyFormat} {...props} />
            )} />
            <Route exact path='/positions/edit/:id' render={(props) => (
              <EditPosition currencyFormat={this.currencyFormat} {...props} />
            )} />
            <Route exact path='/positions/new' render={(props) => (
              <AddPosition currencyFormat={this.currencyFormat} {...props} />
            )} />
            <Route path='/*' render={() => (<Redirect to='/' />)} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
