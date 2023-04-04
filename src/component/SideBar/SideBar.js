import React, { useState } from 'react'
import {
    FaTh,
    FaBars,
    FaNewspaper
} from "react-icons/fa"
import { NavLink } from 'react-router-dom'
import './style.css'
export const SideBar = ({children}) => {

    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen);

    const menuItem =[
        {
            path:"/dashboard",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/dataartikel",
            name:"Data Article",
            icon:<FaNewspaper/>
        }
    ]

  return (
    <div className="container">
        <div style={{width: isOpen ? "250px" : "50px"}} className='sidebar'>
            <div className='top-section'>
                <h1 style={{display: isOpen ? "block" : "none"}} className='logo'>Logo</h1>
                <div style={{marginLeft: isOpen ? "140px" : "0px"}} className='bars'>
                    <FaBars onClick={toggle}/>
                </div>
            </div>
            {
                menuItem.map((item, index)=>(
                    <NavLink to={item.path} key={index} className="link" activeclassName="active">
                        <div className='icon'>{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none"}} className='link_text'>{item.name}</div>
                    </NavLink>
                ))
            }
        </div>
        <main>{children}</main>
    </div>
  )
}
