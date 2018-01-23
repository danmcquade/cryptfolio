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
    let mobileNav = document.querySelector('.mobilenav')
    if (linksEl.style.display === 'none') {
      linksEl.style.display = 'block'
      mobileNav.style.height = 'auto'
    } else {
      linksEl.style.display = 'none'
      mobileNav.style.height = '58px'
    }
    e.preventDefault()
  }

  hideNav () {
    console.log('hiding nav')
    let linksEl = document.querySelector('.mobile-links')
    let mobileNav = document.querySelector('.mobilenav')
    linksEl.style.display = 'none'
    mobileNav.style.height = '58px'
  }

  render () {
    let loginButton
    let avatarImg = null
    const navExp = {
      fontSize: '35px',
      color: '#ffffff',
      textDecoration: 'none',
      right: '15px',
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
        <nav id='#myTopnav' className='topnav'>
          <Link to='/'><img className='nav-logo' alt='Cryptfolio Logo' src='https://s3.amazonaws.com/cryptfolio-cdn/logo.png' /></Link>
          <Link className='nav-link' to='/' >Home</Link>
          <Link className='nav-link' to='/positions'>Positions</Link>
          {loginButton}
          {avatarImg}
        </nav>

        <nav id='#responsiveNav' className='mobilenav'>
          <Link to='/' onClick={() => { this.hideNav() }}><img className='nav-logo' alt='Cryptfolio Logo' src='https://s3.amazonaws.com/cryptfolio-cdn/logo.png' /></Link>
          <a href='' style={navExp} className='icon' onClick={(e) => { this.expandNav(e) }}>☰</a>
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
          contentLabel='Login'
        >
          <Login loggedIn={this.props.loggedIn} setLoginState={this.props.setLoginState} whoAmIf={this.props.whoAmIf} closeModal={this.closeLoginModal} openRegisterModal={this.openRegisterModal} />
        </Modal>

        <Modal
          isOpen={this.state.registerModalIsOpen}
          onRequestClose={this.closeRegisterModal}
          style={modalStyle}
          contentLabel='Register'
        >
          <Register closeRegisterModal={this.closeRegisterModal} setLoginState={this.props.setLoginState} whoAmIf={this.props.whoAmIf} />
        </Modal>

      </div>
    )
  }
}

export default Nav
