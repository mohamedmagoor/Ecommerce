import React from 'react'
import style from "./Footer.module.css"

export default function Footer() {
  return <>

<div className="footer bg-main-light py-5">
      <div className="container">
        <h3>Get the FreshCart app</h3>
        <p style={{ color: "#9b9797" }}>
          We will send you a link, open iton your phone to download the app.
        </p>
        <div>
          <input
            className="form-control"
            type="email"
            placeholder="Email ......"
          />
          <button className="mt-3 ms-auto d-block btn bg-main text-white">
            Share App Link
          </button>
        </div>
      </div>
    </div>
  
  
  </>
}
