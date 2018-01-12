import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <Link to='/'><img className='header-logo' alt='Cryptfolio Logo' src={ process.env.PUBLIC_URL + '/color-header-logo.png'} /></Link>
  )
}

export default Header
