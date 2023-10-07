import React from 'react'
import { Helmet } from 'react-helmet'
import notFound from "../../Assets/images/error.svg"


export default function Notfound() {
  return <>
  
   <div className="notfound py-5 text-center">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Not Found</title>
      </Helmet>
      <img src={notFound} alt="not found" />
    </div>
  
  </>
   
  
}
