import React, { Component } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import './App.css'
import AddPosition from './AddPosition'
import CoinDetail from './CoinDetail'
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
    if (localStorage.getItem('cryptfolio-jwt')) {
      this.setState({loggedIn: true})
    }
  }

  setLoginState (state) {
    this.setState({
      loggedIn: state
    }, () => { console.log('Login state set to: ' + this.state.loggedIn) })
  }

  render () {
    return (
      <div className='App'>
        <Nav loggedIn={this.state.loggedIn} setLoginState={this.setLoginState} />
        <img className='header-logo' alt='Cryptfolio Logo' src='/header-alt-logo.png' />
        <main>
          <Switch>
            <Route exact path='/' render={() => (
              <Dashboard currencyFormat={this.currencyFormat} />
            )} />
            <Route exact path='/login' render={(props) => (
              <Login loggedIn={this.state.loggedIn} setLoginState={this.setLoginState} {...props} />
            )} />
            <Route exact path='/detail/:id' render={(props) => (
              <CoinDetail currencyFormat={this.currencyFormat} {...props} />
            )} />
            <Route exact path='/positions' render={(props) => (
              <Positions loggedIn={this.state.loggedIn} currencyFormat={this.currencyFormat} {...props} />
            )} />
            <Route exact path='/positions/edit/:id' render={(props) => (
              <EditPosition loggedIn={this.state.loggedIn} currencyFormat={this.currencyFormat} {...props} />
            )} />
            <Route exact path='/positions/new' render={(props) => (
              <AddPosition loggedIn={this.state.loggedIn} currencyFormat={this.currencyFormat} {...props} />
            )} />
            <Route path='/*' render={() => (<Redirect to='/' />)} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
