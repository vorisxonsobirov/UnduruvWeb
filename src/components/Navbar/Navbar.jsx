import React from 'react'
import "../../App.css"
import "./navbar.css"
import logo from "../../assets/dc6cbae6-337a-4f85-be43-20ed35420658_removalai_preview.png"

const Navbar = () => {
  return (
        <div className="Navbar">
        {/* <div className='logo'><img src={logo} alt="" /></div> */}
        <h1>Mxsoft</h1>
        <div className='Links'>
          <ul>
            <li>+998 90 551-78-07</li>
          </ul>
        </div>
       </div>
  )
}

export default Navbar
