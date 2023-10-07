import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleSubmit(values) {
    const { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      )
      .catch((err) => {
        setError(err.response.data.message);
      });

    if (data.statusMsg === "success") {
      navigate("/verificationcode");
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("This field is required")
      .email("Enter a valid email"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return <>
   <div className="forgetpassword py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forget Password</title>
      </Helmet>
      {error ? (
        <div className="alert alert-danger mb-3 p-2 text-center">{error}</div>
      ) : null}
      <h2 className="mb-4">Forget Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="email" className="mb-1">
            Email:
          </label>
          <input
            className="form-control"
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn bg-main text-white w-25  mt-4 d-block mx-auto">
          Send
        </button>
      </form>
    </div></>
}
