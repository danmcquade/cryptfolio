import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <Link to='/'><img className='header-logo' alt='Cryptfolio Logo' src={'http://cdn.danmcq.com/cryptfolio/color-header-logo.png'} /></Link>
  )
}

export default Header
