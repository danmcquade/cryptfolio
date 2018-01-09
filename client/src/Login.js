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
        localStorage.setItem('jwt', result.jwt)
        $('.loginform').hide()
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

  render () {
    return (
      <div>
        <p className='notification' />
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
          <button
            onClick={this.login}
          >Login</button>
        </div>
      </div>
    )
  }
}

export default Login
