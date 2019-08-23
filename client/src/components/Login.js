import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


function Login({touched, errors}) {
  return(
    <Form className="form">
      <h1>Welcome to the Bubble App!</h1>
      <div className="form-box">
        <label className="label">Username: </label>
        <Field
          className="input"
          name="username"
          type="text"
        />
        <p>{touched.username && errors.username}</p>
      </div>
      <div className="form-box">
        <label className="label">Password: </label>
        <Field 
          className="input"
          name="password"
          type="password"
          autoComplete="off"
        />
        <p>{touched.password && errors.password}</p>
      </div>
      <button type="submit" className="button">
        Submit
      </button>
    </Form>
  )
}

export default withFormik({
  mapPropsToValues() {
    return {
      username: "",
      password: ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(8).required("Password is ALSO required")
  }),

  //get token with post request
  //save token to local storage
  handleSubmit(values, formikBag) {
    const url = "http://localhost:5000/api/login";
    axios
      .post(url, values)
      .then(results => {
        localStorage.setItem("token", results.data.payload);
        formikBag.props.history.push("/bubblepage");
      })
      .catch(error => {
        console.log("Error: ", error.response.data)
      })
  }
})(Login);

