import React, { Component } from 'react'
import $ from 'jquery'

class Positions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      positions: []
    }
  }

  componentDidMount () {
    $('.logout').hide()
    console.log('Login Component Mounted!')
    if (!localStorage.getItem('cryptfolio-jwt')) {
      console.log('Not logged in')
    } else {
      console.log('We have a token!')
      this.setState({loggedIn: true})
      this.getPositions()
    }
  }

  getPositions () {
    let token = 'Bearer ' + localStorage.getItem('cryptfolio-jwt')
    console.log(token)
    $.ajax({
      url: 'http://localhost:3001/api/positions',
      type: 'GET',
      beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token) },
      context: this, // Allows us to use this.setState inside success
      success: function (result) {
        console.log(result)
        this.setState({positions: JSON.stringify(result)})
      },
      error: function (xhr) {
        console.log('Fetch positions from API failed')
      }
    })
  }

  render () {
    return (
      <div>
        <h1>Positions</h1>
        {this.state.loggedIn ? this.state.positions : <strong>Not authorized to view positions</strong>}
      </div>
    )
  }
}

export default Positions
