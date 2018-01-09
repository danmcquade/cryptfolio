import React, { Component } from 'react'
import $ from 'jquery'
import './Dashboard.css'

class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      coins: [],
      login: false
    }
    this.login = this.login.bind(this)
  }

  login () {
    const email = 'test@test.com'
    const password = 'password'
    const request = {'auth': {'email': email, 'password': password}}
    console.log(request)
    $.ajax({
      url: 'http://localhost:3001/api/user_token',
      type: 'POST',
      data: request,
      dataType: 'json',
      success: function (result) {
        console.log(result)
        localStorage.setItem('jwt', result.jwt)
        $('.loginform').hide()
        $('.notification').empty()
        $('.notification').append('<strong>Login successful</strong>')
        this.setState({login: true})
        this.getBananas()
      }.bind(this),
      error: function(xhr) {
        $('.notification').empty()
        $('.notification').append('<strong>Login failed</strong>')
        console.log('Login failed')
      }
    })
  }

  componentDidMount () {
    $.ajax({
      url: 'http://localhost:3001/api/coins',
      type: 'GET',
      context: this, // Allows us to use this.setState inside success
      success: function (result) {
        console.log(result)
        this.setState({coins: JSON.parse(JSON.stringify(result))})
      },
      error: function (xhr) {
        console.log('Fetch failed')
      }
    })
  }

  render () {
    const allCoins = this.state.coins.map((coin, index) => {
      let divStyle = {
        margin: '35px'
      }
      return (
        <div className='coin-detail' key={index} style={divStyle}>
          <p><strong>Name:</strong> {coin.name}</p>
          <p><strong>Symbol:</strong> {coin.symbol}</p>
          <p><strong>Price:</strong> {coin.price_usd}</p>
        </div>
      )
    })
    return (
      <div>
        <h1>Dashboard</h1>
        <div className='coins-container'>
          {allCoins}
        </div>
      </div>
    )
  }
}

export default Dashboard
