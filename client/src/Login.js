import React, { Component } from 'react'
import $ from 'jquery'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bananasReceived: '',
      loggedIn: false
    }
    this.login = this.login.bind(this)
  }

  login () {
    const email = $('#email').val()
    const password = $('#password').val()
    const request = {'auth': {'email': email, 'password': password}}
    console.log(request)
    $.ajax({
      url: 'http://localhost:3001/api/user_token',
      type: 'POST',
      data: request,
      dataType: 'json',
      success: function (result) {
        console.log(result)
        localStorage.setItem('cryptfolio-jwt', result.jwt)
        $('.loginform').hide()
        $('.logout').show()
        $('.notification').empty()
        $('.notification').append('<strong>Login successful</strong>')
        this.setState({loggedIn: true})
      }.bind(this),
      error: function (xhr) {
        $('.notification').empty()
        $('.notification').append('<strong>Login failed</strong>')
        console.log('Login failed')
      }
    })
  }

  logout () {
    console.log('Clearing local storage...')
    localStorage.removeItem('cryptfolio-jwt')
    $('.notification').empty()
    $('.notification').append('<strong>Logged out</strong>')
    console.log('Logged out.')
    $('.loginform').show()
    $('.logout').hide()
  }

  componentDidMount () {
    $('.logout').hide()
    console.log('Login Component Mounted!')
    if (!localStorage.getItem('cryptfolio-jwt')) {
      console.log('Not logged in')
    } else {
      console.log('We have a token!')
      this.setState({loggedIn: true})
      $('.loginform').hide()
      $('.logout').show()
    }
  }

  render () {
    return (
      <div>
        <p className='notification' />
        <p><strong>Login Status: {this.state.loggedIn ? 'true' : 'false'}</strong></p>
        <div className='loginform'>
          <form>
            <label htmlFor='email'>Email: </label>
            <br />
            <input
              name='email'
              id='email'
              type='email'
            />
            <br /><br />
            <label htmlFor='password'>Password:</label>
            <br />
            <input
              name='password'
              id='password'
              type='password'
            />
          </form>
          <br />
          <button onClick={this.login}>Login</button>
        </div>
        <div className='logout'>
          <button onClick={this.logout}>Logout</button>
        </div>
      </div>
    )
  }
}

export default Login
