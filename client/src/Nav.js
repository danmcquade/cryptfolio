import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

class Nav extends Component {
  render () {
    return (
      <nav>
        <Link to='/'><img className='nav-logo' src='/logo.png' /></Link>
        <Link className='nav-link' to='/' >Home</Link>
        <Link className='nav-link' to='/positions'>Positions</Link>
        <Link to='/login' className='nav-link push-right'>Login</Link>
      </nav>
    )
  }
}

export default Nav
