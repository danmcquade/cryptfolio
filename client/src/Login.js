import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import $ from 'jquery'
import { API_ENDPOINT } from './Api'

class Login extends Component {
  constructor (props) {
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
    const toPositions = function () {
      this.props.history.push('/positions')
    }.bind(this)

    $.ajax({
      url: API_ENDPOINT + '/api/user_token',
      type: 'POST',
      data: request,
      dataType: 'json',
      success: function (result) {
        localStorage.setItem('cryptfolio-jwt', result.jwt)
        $('.loginform').hide()
        $('.logout').show()
        $('.notification').empty()
        this.setState({loggedIn: true})
        this.props.setLoginState(true)
        this.props.whoAmIf()
        toPositions()
        this.props.closeModal()
      }.bind(this),
      error: function (xhr) {
        $('.notification').empty()
        $('.notification').append('<strong style=\'color: red;\'>Login failed</strong>')
        console.log('Login failed')
      }
    })
  }

  componentDidMount () {
    $('.logout').hide()
    if (localStorage.getItem('cryptfolio-jwt')) {
      this.setState({loggedIn: true})
      $('.loginform').hide()
      $('.logout').show()
    }
  }

  render () {
    return (
      <div className='login-container'>
        <img className='login-logo' src='https://s3.amazonaws.com/cryptfolio-cdn/circle-logo.png' alt='Cryptfolio Logo' />
        <p className='notification' />
        <div className='login-form'>
          <form>
            <label htmlFor='email'>Email</label>
            <br />
            <input
              className='login-input'
              name='email'
              id='email'
              type='email'
            />
            <br /><br />
            <label htmlFor='password'>Password</label>
            <br />
            <input
              className='login-input'
              name='password'
              id='password'
              type='password'
            />
          </form>
          <br />
          <button onClick={this.login}>Login</button>
          <button onClick={this.props.openRegisterModal}>Register</button>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)
