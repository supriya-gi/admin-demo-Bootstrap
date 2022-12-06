import React, { useState } from "react";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../App.css";

function SignUp(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    city: "",
    salary: "",
    gender: "",
    hobbies: "",
    type: "",
    // dept: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const createUserDocument = async (user, formData) => {
    if (!user) return;

    const { email } = formData;
    const { password } = formData;
    const { fname } = formData;
    const { lname } = formData;
    const { city } = formData;
    const { salary } = formData;
    const { gender } = formData;
    const { hobbies } = formData;
    const { type } = formData;
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
    console.log("email", formData.email, "pass", formData.password);
    //Funtion to Sign Up with Authentication
    await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    )
      .then((res) => {
        if (res) {
          createUserDocument(res, formData);
          console.log("res", res, "hi", formData);
          props.toggle();
          toast.success("User Register Successfully");
        }
      })
      .catch((error) => {
        console.log("error", error);
        switch (error.code) {
          case "email-already-use-in":
            toast.error(error.message);
            break;
          case "invalid-email":
            toast.error(error.message);
            break;
        }
      });
  };
  return (
    <div class="login-page bg-light">
      <div className="container mt-auto">
        <div className="row">
          <div className="offset-lg-2 mt-5 col-lg-8">
            <form
              onSubmit={(e) => handleSignUp(e)}
              className="border p-5  bg-white shadow rounded"
            >
              <h2 className="mb-5">Create Account</h2>
              {/* <hr /> */}
              <div className="row ">
                <div className="col-md-6">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter Email"
                    name="email"
                    value={formData.email}
                    required
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <br />
                </div>

                <div class="col-md-6">
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    required
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
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
                    value={formData.fname}
                    required
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <br />
                </div>

                <div class="col-md-6">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter last name"
                    name="lname"
                    value={formData.lname}
                    required
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
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
                    value={formData.city}
                    required
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <br />
                </div>
                <div class="col-md-6">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Salary"
                    name="salary"
                    value={formData.salary}
                    required
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div>
              {/* <div className="row"> */}
              <br />
              <label className="mb-3">Gender</label>
              <div
                className="mb-4"
                name="gender"
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <input
                  type="radio"
                  name="gender"
                  id="customRadioInline1"
                  value="male"
                  class="custom-control-input me-1"
                />

                <label
                  class="custom-control-label me-5"
                  htmlFor="customRadioInline1"
                >
                  Male
                </label>
                <input
                  type="radio"
                  name="gender"
                  id="customRadioInline2"
                  value="female"
                  class="custom-control-input me-1"
                />
                <label
                  class="custom-control-label"
                  htmlFor="customRadioInline2"
                >
                  Female
                </label>
              </div>

              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                name="hobbies"
                value={formData.hobbies}
                placeholder="hobbies"
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              ></textarea>
              <br />
              <div className="mt-4">
                <select
                  class="form-select form-select-lg"
                  name="type"
                  //   value={formData.type}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option value="select">Select</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                </select>
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
