import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';





export default function Register() {

  let navigate = useNavigate();
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  let validationSchema = Yup.object({
    name: Yup.string().min(3, 'Name minlength is 3').max(10, 'Name maxlength is 10').required('Name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password Start with Uppercase').required('Password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do NOT match! ').required('rePassword is required'),
  });


  async function submitRegister(values) {

    setisLoading(true);


    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((error) => {
        setisLoading(false);
        seterror(error.response.data.message);
      });
    if (data.message === 'success') {
      setisLoading(false);
      navigate('/login');


    }






  }

  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: ''
    }, validationSchema,
    onSubmit: submitRegister
  });
  return <>
  <Helmet>
    <title>Register</title>
  </Helmet>

    <div className='w-75 mx-auto py-5'>
      {error !== null ? <div className="alert alert-danger">{error}</div> : ''}


      <h3>Register Now</h3>

      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="name">Name :</label>
        <input id='name' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" className='form-control mb-2' name='name' />
        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger p-2 mt-2">{formik.errors.name}</div> : ''}

        <label htmlFor="email">Email :</label>


        <input id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" className='form-control mb-2' name='email' />

        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div> : ''}

        <label htmlFor="phone">Phone :</label>
        <input id='phone' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" className='form-control mb-2' name='phone' />

        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger p-2 mt-2">{formik.errors.phone}</div> : ''}

        <label htmlFor="password">Password :</label>

        <input id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" className='form-control mb-2' name='password' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger p-2 mt-2">{formik.errors.password}</div> : ''}

        <label htmlFor="repassword">rePassword :</label>

        <input id='repassword' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" className='form-control mb-2' name='rePassword' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger p-2 mt-2">{formik.errors.rePassword}</div> : ''}

        

        {isLoading ? <button type='button' className='btn bg-main text-white mt-2'>

          <Audio
            height="24"
            width="100"
            color="#fff"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true} />
        </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Register</button>}

      </form>
    </div>




  </>;
}
