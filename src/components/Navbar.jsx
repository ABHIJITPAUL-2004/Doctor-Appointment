import React from 'react'
import logo from '../assets/logo.svg'

export default function Navbar(){
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="Clinic logo" className="nav-logo" />
        <div className="brand">
          <div className="brand-title">Medical Appointments</div>
          <div className="brand-sub">Clinic Portal</div>
        </div>
      </div>

      <div className="nav-right">
        <a className="nav-link" href="#">Help</a>
        <button className="btn btn-muted">Register</button>
        <button className="btn btn-primary">Login</button>
      </div>
    </nav>
  )
}
