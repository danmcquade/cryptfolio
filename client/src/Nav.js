import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

class Nav extends Component {
  logout () {
    console.log('Clearing local storage...')
    localStorage.removeItem('cryptfolio-jwt')
    this.props.setLoginState(false)
    console.log('Logged out.')
  }
  render () {
    console.log('Props: ' + this.props.loggedIn)
    let loginButton
    if (this.props.loggedIn) {
      loginButton = <Link to='/' onClick={() => { this.logout() }} className='nav-link push-right'>Logout</Link>
    } else {
      loginButton = <Link to='/login' className='nav-link push-right'>Login</Link>
    }
    return (
      <nav>
        <Link to='/'><img className='nav-logo' alt='Cryptfolio Logo' src='/logo.png' /></Link>
        <Link className='nav-link' to='/' >Home</Link>
        <Link className='nav-link' to='/positions'>Positions</Link>
        {loginButton}
      </nav>
    )
  }
}

export default Nav
