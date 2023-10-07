import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { cartContext } from '../context/cartContext';




export default function Address() {

  let {onlinePayment,cartId} = useContext(cartContext)
  

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  let validationSchema = Yup.object({
    details: Yup.string().min(3, 'details minlength is 3').max(50,'details maxlength is 50').required('details are required'),
    phone:Yup.string().matches(phoneRegExp,'Phone number is not valid').required('Phone is required'),
   })


  async function handelAddressSubmit(values){
   let res = await onlinePayment(cartId,values)
    window.location.href =  res?.data.session.url
   
   
   }
  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    },validationSchema
    ,onSubmit:handelAddressSubmit
    
  })
  return <>
  <div className="container">
    <div className="w-75 mx-auto  py-5">
    <form onSubmit={formik.handleSubmit}>

      <label htmlFor="details">Details :</label>
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} className='form-control mb-2' type="text" name="details" id="details" />
      {formik.errors.details && formik.touched.details?<div className="alert alert-danger p-2 mt-2">{formik.errors.details}</div>:''}



    <label htmlFor="phone">phone :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className='form-control mb-2' type="tel" name="phone" id="details" />
    {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger p-2 mt-2">{formik.errors.phone}</div>:''}



    <label htmlFor="city">city :</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} className='form-control mb-2' type="text" name="city" id="details" />
    <button type='submit' className='btn bg-main text-white'>Pay Now</button>

    </form>

    
    </div>

    
    </div> 
  </>
}
