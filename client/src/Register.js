import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import $ from 'jquery'
import { API_ENDPOINT } from './Api'

class Register extends Component {
  constructor () {
    super()
    this.handleRegistration = this.handleRegistration.bind(this)
  }

  handleRegistration () {
    const email = $('#email').val()
    const password = $('#password').val()
    const name = $('#name').val()
    const request = {'user': {'email': email, 'name': name, 'password': password}}
    const loginRequest = {'auth': {'email': email, 'password': password}}
    const closeMe = function () {
      this.props.closeRegisterModal()
      this.props.setLoginState(true)
      this.props.whoAmIf()
      this.props.history.push('/positions')
    }.bind(this)
    $.ajax({
      url: API_ENDPOINT + '/users',
      type: 'POST',
      data: request,
      dataType: 'json',
      success: function (result) {
        $.ajax({
          url: API_ENDPOINT + '/api/user_token',
          type: 'POST',
          data: loginRequest,
          dataType: 'json',
          success: function (result) {
            localStorage.setItem('cryptfolio-jwt', result.jwt)
            closeMe()
          },
          error: function (xhr) {
            console.log('Fetch token failed')
          }
        })
      },
      error: function (xhr) {
        $('.notification').empty()
        $('.notification').append('<strong style=\'color: red;\'>Registration failed</strong><br/><p>All fields required</p>')
        console.log('Registration failed')
      }
    })
  }

  render () {
    return (
      <div className='login-container'>
        <img className='login-logo' src='https://s3.amazonaws.com/cryptfolio-cdn/circle-logo.png' alt='Cryptfolio Logo' />
        <p className='notification' />
        <form className='login-form'>
          <label htmlFor='email'>Email</label>
          <br />
          <input className='login-input' name='email' id='email' type='email' />
          <br /><br />
          <label htmlFor='name'>Name</label>
          <br />
          <input className='login-input' name='name' id='name' type='text' />
          <br /><br />
          <label htmlFor='password'>Password</label>
          <br />
          <input className='login-input' name='password' id='password' type='password' /><br />
        </form>
        <br />
        <div className='register-buttons'>
          <button onClick={this.handleRegistration}>Register</button>
          <button onClick={this.props.closeRegisterModal}>Cancel</button>
        </div>
      </div>
    )
  }
}

export default withRouter(Register)
