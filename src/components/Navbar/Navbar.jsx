import React, { useContext } from 'react'
import logo from "../../Assets/images/freshcart-logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'




export default function Navbar() {


  let navigate = useNavigate()
  let {userToken, setUserToken} = useContext(UserContext)

  function logOut(){
    localStorage.removeItem('token')
    setUserToken(null)
    navigate('login')

  }
  return <>
  <nav className="navbar position-sticky z-3 top-0 left-0 right-0 navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="fresh market logo" />
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        {userToken !== null?<>
        <li className="nav-item">
          <Link className="nav-link active text-muted fw-bolder" aria-current="page" to="/">Home</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link active text-muted fw-bolder" aria-current="page" to="/categories">Categories</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link active text-muted fw-bolder" aria-current="page" to="/brands">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-muted fw-bolder" aria-current="page" to="/allorders">Orders</Link>
        </li>
       <li className="nav-item">
          <Link className="nav-link active text-muted fw-bolder" aria-current="page" to="/cart">Cart</Link>
        </li>
       <li className="nav-item">
          <Link className="nav-link active text-muted fw-bolder" aria-current="page" to="/profile">Profile</Link>
        </li>
       <li className="nav-item">
          <Link className="nav-link active text-muted fw-bolder" aria-current="page" to="/wishlist">Wishlist</Link>
        </li>
        
        
        </>:''}
        
      </ul>
      
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      <li className="nav-item d-flex align-items-center">
          <i className='fab fa-facebook mx-2'></i>
          <i className='fab fa-youtube mx-2'></i>
          <i className='fab fa-twitter mx-2'></i>
          <i className='fab fa-instagram mx-2'></i>
          <i className='fab fa-tiktok mx-2'></i>
        </li>
        {userToken !== null?
        <>
        
        <li className="nav-item">
          <span onClick={()=> logOut()} className="nav-link text-muted fw-bolder active cursor-pointer" >Logout</span>
        </li>
        </>:<>
        
        
        
       
        <li className="nav-item">
          <Link className="nav-link active text-muted fw-bolder" aria-current="page" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-muted fw-bolder" aria-current="page" to="/register">Register</Link>
        </li>
        
        </>}

      
       
        
      </ul>
      
    </div>
  </div>
</nav>
  
  </>
}
