import React, { useState } from 'react'
import style from "./ResetPassword.module.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleSubmit(values) {
    const { data } = await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .catch((err) => {
        setError(err.response.data.message);
      });

    if (data.token) {
      navigate("/login");
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("This field is required")
      .email("Enter a valid email"),
    newPassword: Yup.string()
      .required("This field is required")
      .matches(/^[A-Z][a-z0-9]{4,}$/i, "Enter a valid password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return <>
  <div className="resetcode py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reset Password</title>
      </Helmet>
      {error ? (
        <div className="alert alert-danger mb-3 p-2 text-center">{error}</div>
      ) : null}
      <h2 className="mb-4">Reset Password</h2>
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
        <div className="form-group mb-2">
          <label htmlFor="newPassword" className="mb-1">
            New Password:
          </label>
          <input
            className="form-control"
            type="password"
            id="newPassword"
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="alert alert-danger mt-2 p-2">
              {formik.errors.newPassword}
            </div>
          ) : null}
        </div>
        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn bg-main text-white w-25  mt-4 d-block mx-auto">
          Reset Password
        </button>
      </form>
    </div>
  
  </>
}
