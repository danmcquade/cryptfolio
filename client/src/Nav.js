import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import Modal from 'react-modal'
import { modalStyle } from './ModalStyle'
import Login from './Login'
import Register from './Register'

class Nav extends Component {
  constructor () {
    super()

    this.state = {
      modalIsOpen: false
    }

    this.openLoginModal = this.openLoginModal.bind(this)
    this.closeLoginModal = this.closeLoginModal.bind(this)
    this.closeRegisterModal = this.closeRegisterModal.bind(this)
    this.openRegisterModal = this.openRegisterModal.bind(this)
  }

  openLoginModal (e) {
    this.hideNav()
    e.preventDefault()
    this.setState({loginModalIsOpen: true, registerModalIsOpen: false})
  }
  openRegisterModal (e) {
    e.preventDefault()
    this.setState({loginModalIsOpen: false, registerModalIsOpen: true})
  }
  closeLoginModal () {
    this.setState({loginModalIsOpen: false})
  }
  closeRegisterModal () {
    this.setState({registerModalIsOpen: false})
  }

  logout () {
    this.hideNav()
    localStorage.removeItem('cryptfolio-jwt')
    this.props.setLoginState(false)
    this.props.clearWhoAmI()
  }

  componentDidMount () {
    Modal.setAppElement('body')
  }

  expandNav (e) {
    console.log('expanding nav')
    let linksEl = document.querySelector('.mobile-links')
    let mobileNav = document.querySelector('.mobile-nav')
    if (linksEl.style.display === 'none') {
      linksEl.style.display = 'block'
      mobileNav.style.height = 'auto'
    } else {
      linksEl.style.display = 'none'
      mobileNav.style.height = '68px'
    }
    e.preventDefault()
  }

  hideNav () {
    console.log('hiding nav')
    let linksEl = document.querySelector('.mobile-links')
    let mobileNav = document.querySelector('.mobile-nav')
    linksEl.style.display = 'none'
    mobileNav.style.height = '68px'
  }

  render () {
    let loginButton
    let avatarImg = null
    const hamburger = {
      fontSize: '45px',
      color: '#ffffff',
      textDecoration: 'none',
      right: '15px',
      top: '3px',
      position: 'absolute'

    }
    let mobStyle = {
      display: 'none'
    }
    if (this.props.loggedIn) {
      loginButton = <Link to='/' onClick={() => { this.logout() }} className='nav-link push-right'>Logout</Link>
      if (this.props.whoami) {
        avatarImg = <div className='nav-avatar'><Link to='/positions'><img src={this.props.whoami.avatar} alt={`${this.props.whoami.name}'s Avatar'`} /></Link></div>
      }
    } else {
      loginButton = <Link to='' onClick={(e) => { this.openLoginModal(e) }} className='nav-link push-right'>Login</Link>
    }
    return (
      <div>
        <nav className='main-nav'>
          <Link to='/'><img className='nav-logo' alt='Cryptfolio Logo' src='https://s3.amazonaws.com/cryptfolio-cdn/logo.png' /></Link>
          <Link className='nav-link' to='/' >Home</Link>
          <Link className='nav-link' to='/positions'>Positions</Link>
          {loginButton}
          {avatarImg}
        </nav>

        <nav className='mobile-nav'>
          <Link to='/' onClick={() => { this.hideNav() }}><img className='nav-logo' alt='Cryptfolio Logo' src='https://s3.amazonaws.com/cryptfolio-cdn/logo.png' /></Link>
          <a href='' style={hamburger} className='icon' onClick={(e) => { this.expandNav(e) }}>☰</a>
          <div className='mobile-links' style={mobStyle}>
            <Link className='nav-link' to='/' onClick={() => { this.hideNav() }}>Home</Link>
            <Link className='nav-link' to='/positions' onClick={() => { this.hideNav() }}>Positions</Link>
            {loginButton}
          </div>
        </nav>

        <Modal
          isOpen={this.state.loginModalIsOpen}
          onRequestClose={this.closeLoginModal}
          style={modalStyle}
          closeTimeoutMS={500}
          contentLabel='Login'
        >
          <Login loggedIn={this.props.loggedIn} setLoginState={this.props.setLoginState} whoAmIf={this.props.whoAmIf} closeModal={this.closeLoginModal} openRegisterModal={this.openRegisterModal} />
        </Modal>

        <Modal
          isOpen={this.state.registerModalIsOpen}
          onRequestClose={this.closeRegisterModal}
          style={modalStyle}
          closeTimeoutMS={500}
          contentLabel='Register'
        >
          <Register closeRegisterModal={this.closeRegisterModal} setLoginState={this.props.setLoginState} whoAmIf={this.props.whoAmIf} />
        </Modal>

      </div>
    )
  }
}

export default Nav
