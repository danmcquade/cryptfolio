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
