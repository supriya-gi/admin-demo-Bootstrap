import React, { useState } from "react";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  validateYupSchema,
  useFormik,
} from "formik";
import * as Yup from "yup";
import "../App.css";
import { type } from "@testing-library/user-event/dist/type";

const LoginSchema = (values) => {
  const errors = {};
  if (!values.salary) {
    errors.salary = "*This Field is Required";
  } else if (!/^[0-9]+$/i.test(values.salary)) {
    errors.salary = "Only Number Is Accepted";
  }
  if (!values.fname) {
    errors.fname = "*This Field is Required";
  } else if (values.fname.length > 15) {
    errors.fname = "Must be 15 characters or less";
  }

  if (!values.lname) {
    errors.lname = "*This Field is Required";
  } else if (values.lname.length > 20) {
    errors.lname = "Must be 20 characters or less";
  }

  if (!values.city) {
    errors.city = "*This Field is Required";
  }
  if (!values.type) {
    errors.type = "*This Field is Required";
  }

  if (!values.email) {
    errors.email = "*This Field is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "*This Field is Required";
  }
  if (!values.gender) {
    errors.gender = "*This Field is Required";
  }
  if (!values.hobbies) {
    errors.hobbies = "*This Field is Required";
  }

  return errors;
};
function SignUp(props) {
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  //   fname: "",
  //   lname: "",
  //   city: "",
  //   salary: "",
  //   gender: "",
  //   hobbies: "",
  //   type: "",
  //   // dept: "",
  // });
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const createUserDocument = async (user, values) => {
    if (!user) return;

    const { email } = values;
    const { password } = values;
    const { fname } = values;
    const { lname } = values;
    const { city } = values;
    const { salary } = values;
    const { gender } = values;
    const { hobbies } = values;
    const { type } = values;
    const uid = user.user.uid;
    console.log(user);

    await setDoc(doc(db, `Employee`, `${user?.user.uid}`), {
      email,
      password,
      fname,
      lname,
      city,
      salary,
      gender,
      hobbies,
      type,
      uid,
      dept: "",
      //   createdAt: new Date(),
    });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("email", formik.values.email, "pass", formik.values.password);
    //Funtion to Sign Up with Authentication
    await createUserWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then((res) => {
        if (res) {
          createUserDocument(res, formik.values);
          console.log("res", res, "hi", formik.values);

          props.toggle();
          // toast.success("User Register Successfully");
          toast("User Register successfully", { type: "success" });
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast("invalid Credential", { type: "error" });
        switch (error.code) {
          case "email-already-use-in":
            // toast(error.message);
            toast("email-already-use-in", { type: "error" });
            break;
          case "invalid-email":
            // toast(error.message);

            toast("invalid-email", { type: "error" });
            break;
        }
      });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fname: "",
      lname: "",
      city: "",
      salary: "",
      gender: "",
      hobbies: "",
      type: "",
    },
    validate: LoginSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      console.log(values);
    },
  });

  return (
    <div class="login-page  register ">
      <div className="container">
        <div className="row">
          <div className="offset-lg-2 col-xs-12 col-lg-8">
            <form
              onSubmit={(e) => handleSignUp(e)}
              className="borderp-5 p-5  bg-white shadow rounded "
            >
              <h2 className="mb-5">Create Account</h2>
              <div className="row ">
                <div className="col-md-6 col-sm-12">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter Email"
                    name="email"
                    value={formik.values.email}
                    required
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email && (
                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                  )}
                  <br />
                </div>

                <div class="col-md-6">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Enter password"
                    name="password"
                    value={formik.values.password}
                    required
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password && (
                    <div style={{ color: "red" }}>{formik.errors.password}</div>
                  )}
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter first name"
                    name="fname"
                    value={formik.values.fname}
                    required
                    onChange={formik.handleChange}
                  />
                  {formik.errors.fname && (
                    <div style={{ color: "red" }}>{formik.errors.fname}</div>
                  )}
                  <br />
                </div>

                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter last name"
                    name="lname"
                    value={formik.values.lname}
                    required
                    onChange={formik.handleChange}
                  />
                  {formik.errors.lname && (
                    <div style={{ color: "red" }}>{formik.errors.lname}</div>
                  )}
                </div>
              </div>
              <br />
              <div className="row">
                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter city"
                    name="city"
                    value={formik.values.city}
                    required
                    onChange={formik.handleChange}
                  />
                  {formik.errors.city && (
                    <div style={{ color: "red" }}>{formik.errors.city}</div>
                  )}
                  <br />
                </div>
                <div class="col-md-6">
                  <input
                    type="number"
                    class="form-control"
                    min="0"
                    placeholder="Salary"
                    name="salary"
                    value={formik.values.salary}
                    required
                    onChange={formik.handleChange}
                  />
                  {formik.errors.salary && (
                    <div style={{ color: "red" }}>{formik.errors.salary}</div>
                  )}
                </div>
              </div>
              {/* <div className="row"> */}
              <br />
              <label className="mb-3">Gender</label>
              <div
                className="mb-4 d-flex justify-content-center"
                name="gender"
                onChange={formik.handleChange}
              >
                {formik.errors.gender && (
                  <div style={{ color: "red" }}>{formik.errors.gender}</div>
                )}
                <div class="form-check me-5">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    id="flexRadioDefault1"
                    value="male"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Male
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gender"
                    value="female"
                    id="flexRadioDefault2"
                  />
                  <label class="form-check-label" for="flexRadioDefault2">
                    Female
                  </label>
                </div>
              </div>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                name="hobbies"
                value={formik.values.hobbies}
                placeholder="hobbies"
                onChange={formik.handleChange}
                required
              ></textarea>
              {formik.errors.hobbies && (
                <div style={{ color: "red" }}>{formik.errors.hobbies}</div>
              )}
              <br />
              <div className="mt-4">
                <select
                  class="form-select form-select-lg"
                  name="type"
                  //   value={values.type}
                  onChange={formik.handleChange}
                >
                  <option value="select">Select</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                </select>
                {formik.errors.type && (
                  <div style={{ color: "red" }}>{formik.errors.type}</div>
                )}
              </div>
              <br />
              <button type="submit" class="btn btn-primary">
                SignUp
              </button>
              <hr />
              <Link className="links" onClick={props.toggle}>
                Already account ? Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
