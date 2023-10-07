import React, { useContext, useState } from 'react'
import style from "./Login.module.css"
import { useFormik } from 'formik'
import * as Yup from "yup";
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import { UserContext } from '../context/userContext';
import { Helmet } from 'react-helmet';





export default function Login() {

  let {userToken,setUserToken} = useContext(UserContext)
  

  let navigate = useNavigate()
  const [error, seterror] = useState(null)
  const [isLoading, setisLoading] = useState(false)


   let validationSchema = Yup.object({
    email:Yup.string().email('Email is invalid').required('Email is required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password Start with Uppercase').required('Password is required'),
   })


  async function loginSubmit(values){

   setisLoading(true);
  

   let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
   .catch((error)=> {
   setisLoading(false)
   seterror(error.response.data.message)})
   if(data.message === 'success'){
    setisLoading(false)
    console.log(data.token);
    localStorage.setItem('token',data.token)
    setUserToken(data.token)
    navigate('/')

    
   }
   



    
      
  }

  let formik = useFormik({
    initialValues:{
     
      email:'',
      password:'',
      
    },validationSchema,
    onSubmit:loginSubmit
  })
  return <>

  <div className='w-75 mx-auto py-5'>
    {error !== null?<div className="alert alert-danger">{error}</div>: ''}
    

    <h3>Login Now </h3>
    <Helmet>
          <title>Login</title>
        </Helmet>

     <form  onSubmit={formik.handleSubmit}>

            
            <label htmlFor="email">Email :</label>    
            <input id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className='form-control mb-2' name='email' />
            {formik.errors.email && formik.touched.email?<div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div>:''}

         
            <label htmlFor="password">Password :</label>

            <input id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" className='form-control mb-2' name='password' />
            {formik.errors.password && formik.touched.password?<div className="alert alert-danger p-2 mt-2">{formik.errors.password}</div>:''}

           

             {isLoading? <button type='button' className='btn bg-main text-white mt-2'>

             <BallTriangle
              height={20}
              width={100}
              radius={5}
              color="#fff"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
              </button>:<>

              <div className='d-flex align-items-center'>
                
                 <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Login</button>

                               <Link className=' btn text-main' to="/forgetpassword"> Forget Password... ?</Link>

              </div>
              
              </>
              
             
}
              
          </form>
          

  </div>
         

  
  
  </>
}
