import React, { useState } from 'react'
import style from "./Layout.module.css"
import Navbar from "../Navbar/Navbar"
import Footer from "../Footer/Footer"
import { Outlet } from 'react-router-dom'
import { Offline,Online } from "react-detect-offline";


export default function Layout() {

  const [isonline, setonline] = useState(false)
  return <>
  <Navbar></Navbar>
  <div className="container">
     <Outlet/>
  </div>
 

  <div>
    <Offline>
      <div className="network">
        <i className='fas fa-wifi p-2 text-muted'></i> 
        It looks like you're not connected to the internet.

      </div>
    </Offline>
  </div>
  <Footer></Footer>
  
  </>
}
