import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'
import Modal from 'react-modal'
import Login from './Login'

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 0px 5px #00000073'
  }
}

class Nav extends Component {
  constructor () {
    super()

    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal (e) {
    e.preventDefault()
    this.setState({modalIsOpen: true})
  }

  afterOpenModal () {
  }

  closeModal () {
    this.setState({modalIsOpen: false})
  }

  logout () {
    console.log('Clearing local storage...')
    localStorage.removeItem('cryptfolio-jwt')
    this.props.setLoginState(false)
    this.props.clearWhoAmI()
    console.log('Logged out.')
  }

  componentDidMount () {
    Modal.setAppElement('body')
  }

  render () {
    let loginButton
    let avatarImg = null
    if (this.props.loggedIn) {
      loginButton = <Link to='/cryptfolio' onClick={() => { this.logout() }} className='nav-link push-right'>Logout</Link>
      if (this.props.whoami) {
        avatarImg = <div className='nav-avatar'><Link to='/positions'><img src={this.props.whoami.avatar} alt={`${this.props.whoami.name}'s Avatar'`} /></Link></div>
      }
    } else {
      loginButton = <Link to='' onClick={(e) => { this.openModal(e) }} className='nav-link push-right'>Login</Link>
    }
    return (
      <div>
        <nav>
          <Link to='/cryptfolio'><img className='nav-logo' alt='Cryptfolio Logo' src='http://cdn.danmcq.com/cryptfolio/logo.png' /></Link>
          <Link className='nav-link' to='/cryptfolio' >Home</Link>
          <Link className='nav-link' to='/positions'>Positions</Link>
          {loginButton}
          {avatarImg}
        </nav>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={modalStyle}
          contentLabel='Login'
        >
          <Login loggedIn={this.props.loggedIn} setLoginState={this.props.setLoginState} whoAmIf={this.props.whoAmIf} closeModal={this.closeModal} />
        </Modal>
      </div>
    )
  }
}

export default Nav
