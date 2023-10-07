import React from 'react'
import style from "./Profile.module.css"
import jwtDecode from 'jwt-decode'
import { Helmet } from 'react-helmet';


export default function Profile() {

  let {name} =  jwtDecode(localStorage.getItem("token"))
  console.log(name);
  return <>

        <section className='d-flex mt-5 align-items-center justify-content-center '>
        <Helmet>
          <title>Profile</title>
        </Helmet>
          <h1>Hello : {name}</h1>
        </section>


  </>
}
