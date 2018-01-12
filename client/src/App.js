import React, { Component } from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import $ from 'jquery'
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
      loggedIn: false,
      whoami: null
    }
    this.setLoginState = this.setLoginState.bind(this)
    this.clearWhoAmI = this.clearWhoAmI.bind(this)
    this.whoAmIf = this.whoAmIf.bind(this)
  }

  currencyFormat (num) {
    return num.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
  }

  setLoginState (state) {
    this.setState({
      loggedIn: state
    }, () => { console.log('Login state set to: ' + this.state.loggedIn) })
  }

  clearWhoAmI () {
    this.setState({
      whoami: null
    })
  }

  whoAmIf () {
    let token = 'Bearer ' + localStorage.getItem('cryptfolio-jwt')
    $.ajax({
      url: 'https://cryptfolio-api.herokuapp.com/api/whoami',
      type: 'GET',
      beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
      context: this,
      success: function (result) {
        this.setState({whoami: JSON.parse(JSON.stringify(result))})
      },
      error: function (xhr) {
        console.log('Fetch user data from API failed')
      }
    })
  }

  componentDidMount () {
    if (localStorage.getItem('cryptfolio-jwt')) {
      this.setState({loggedIn: true})
      this.whoAmIf()
    }
  }

  render () {
    return (
      <div className='App'>
        <Nav loggedIn={this.state.loggedIn} whoAmIf={this.whoAmIf} setLoginState={this.setLoginState} whoami={this.state.whoami} clearWhoAmI={this.clearWhoAmI} />
        <main>
          <Switch>
            <Route exact path='/cryptfolio' render={() => (
              <Dashboard loggedIn={this.state.loggedIn} currencyFormat={this.currencyFormat} />
            )} />
            <Route exact path='/login' render={(props) => (
              <Login loggedIn={this.state.loggedIn} whoAmIf={this.whoAmIf} setLoginState={this.setLoginState} {...props} />
            )} />
            <Route exact path='/detail/:id' render={(props) => (
              <CoinDetail currencyFormat={this.currencyFormat} {...props} />
            )} />
            <Route exact path='/positions' render={(props) => (
              <Positions loggedIn={this.state.loggedIn} currencyFormat={this.currencyFormat} whoAmIf={this.whoAmIf} whoami={this.state.whoami} {...props} />
            )} />
            <Route exact path='/positions/edit/:id' render={(props) => (
              <EditPosition loggedIn={this.state.loggedIn} currencyFormat={this.currencyFormat} {...props} />
            )} />
            <Route exact path='/positions/new/:currency?' render={(props) => (
              <AddPosition loggedIn={this.state.loggedIn} currencyFormat={this.currencyFormat} {...props} />
            )} />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
