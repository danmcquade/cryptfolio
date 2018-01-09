import React, { Component } from 'react'
import $ from 'jquery'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      coins: [],
      login: false
    }
    this.setLogin = this.setLogin.bind(this)
  }

  setLogin () {
    let status = this.state.login
    this.setState({
      login: !status
    })
  }

  componentDidMount () {
    $.ajax({
      url: 'http://localhost:3001/api/coins',
      type: 'GET',
      context: this, // Allows us to use this.setState inside success
      success: function (result) {
        console.log(result)
        this.setState({coins: JSON.stringify(result)})
      },
      error: function (xhr) {
        console.log('Fetch failed')
      }
    })
  }

  render () {
    return (
      <div>
        <h1>Dashboard</h1>
        <button
          onClick={this.setLogin}
          style={{marginTop: '10vh'}}
        >
          Get Bananas
        </button>
        <p>{this.state.login ? "true" : "false"}</p>
        <p>{this.state.coins}</p>
      </div>
    )
  }
}

export default Dashboard
