import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import './Nav.css'

class Nav extends Component {

  logout () {
    console.log('Clearing local storage...')
    localStorage.removeItem('cryptfolio-jwt')
    this.props.setLoginState(false)
    this.props.clearWhoAmI()
    console.log('Logged out.')
  }

  componentDidMount () {
    console.log(this.props)
  }

  render () {
    let loginButton
    let avatarImg = null
    if (this.props.loggedIn) {
      loginButton = <Link to='/' onClick={() => { this.logout() }} className='nav-link push-right'>Logout</Link>
      if (this.props.whoami) {
        avatarImg = <div className='nav-avatar'><Link to='/positions'><img src={this.props.whoami.avatar} alt={`${this.props.whoami.name}'s Avatar'`} /></Link></div>
      }
    } else {
      loginButton = <Link to='/login' className='nav-link push-right'>Login</Link>
    }
    return (
      <nav>
        <Link to='/'><img className='nav-logo' alt='Cryptfolio Logo' src='/logo.png' /></Link>
        <Link className='nav-link' to='/' >Home</Link>
        <Link className='nav-link' to='/positions'>Positions</Link>
        {loginButton}
        {avatarImg}
      </nav>
    )
  }
}

export default Nav
