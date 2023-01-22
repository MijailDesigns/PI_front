import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logox.png'
import c from './NavBar.module.css'

export const NavBar = () => {

  return (
      <div className={c.navbar}>
          <div className={c.logo}>
            <img src={logo} alt='logo' style={{height: '45px', width: 'auto'}}/>
            Compass
          </div>
          
          <div className={c.paths} >
            <Link className={c.navLink} to='/home' >Home</Link>
            <Link className={c.navLink} to='/about' >About</Link>
            <Link className={c.navLink} to='/activities' >Activities</Link>
            <Link className={c.navLink} to='/createActivity/create' >Create Activity</Link>
          </div>
          
      </div>
  )
}

export default NavBar