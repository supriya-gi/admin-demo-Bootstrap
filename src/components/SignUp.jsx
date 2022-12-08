import React, { useState } from "react";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import "../App.css";

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
  const blockInvalidChar = (e) =>
    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
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
    <section className=" py-1 bg-blueGray-50">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t  mb-0 px-6 py-4">
            <div className="text-center flex justify-center">
              <h6 className="text-blueGray-700 text-xl  font-bold">
                Create account
              </h6>
            </div>
          </div>
          <hr />
          <div className="flex-auto px-4 lg:px-10 py-10 pt-4 ">
            <form onSubmit={(e) => handleSignUp(e)}>
              {/* <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              User Information
            </h6> */}
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 md:w-6/12 sm:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      name="email"
                      value={formik.values.email}
                      required
                      onChange={formik.handleChange}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />{" "}
                    {formik.errors.email && (
                      <div style={{ color: "red" }}>{formik.errors.email}</div>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 md:w-6/12  sm:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Enter password"
                      name="password"
                      value={formik.values.password}
                      required
                      onChange={formik.handleChange}
                    />{" "}
                    {formik.errors.password && (
                      <div style={{ color: "red" }}>
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 md:w-6/12 sm:w-6/12  px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Enter first name"
                      name="fname"
                      value={formik.values.fname}
                      required
                      onChange={formik.handleChange}
                    />{" "}
                    {formik.errors.fname && (
                      <div style={{ color: "red" }}>{formik.errors.fname}</div>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 md:w-6/12 sm:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      name="lname"
                      placeholder="Enter last Name"
                      value={formik.values.lname}
                      required
                      onChange={formik.handleChange}
                    />
                    {formik.errors.lname && (
                      <div style={{ color: "red" }}>{formik.errors.lname}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 md:w-6/12 sm:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Enter city"
                      name="city"
                      value={formik.values.city}
                      required
                      onChange={formik.handleChange}
                    />{" "}
                    {formik.errors.city && (
                      <div style={{ color: "red" }}>{formik.errors.city}</div>
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-6/12 md:w-6/12 sm:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      Salary
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      min="0"
                      placeholder="Salary"
                      onKeyDown={blockInvalidChar}
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
              </div>
              <label
                className="block uppercase text-blueGray-600 text-xs text-center font-bold mt-3"
                htmlfor="grid-password"
              >
                Gender
              </label>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
                  <div
                    className="relative justify-center w-full item-center  flex my-4"
                    name="gender"
                    onChange={formik.handleChange}
                  >
                    <div className="flex items-center mr-6  ">
                      <input
                        id="default-radio-1"
                        type="radio"
                        value="male"
                        name="gender"
                        className=" h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="default-radio-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Male
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="default-radio-2"
                        type="radio"
                        value="female"
                        name="gender"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="default-radio-2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-8/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlfor="grid-password"
                    >
                      Hobbies
                    </label>
                    <textarea
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      rows="3"
                      name="hobbies"
                      value={formik.values.hobbies}
                      placeholder="hobbies"
                      onChange={formik.handleChange}
                      required
                    ></textarea>
                    {formik.errors.hobbies && (
                      <div style={{ color: "red" }}>
                        {formik.errors.hobbies}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center my-7">
                <div className="mb-3 lg:w-96 md:w-96 sm:w-96 ">
                  <select
                    name="type"
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label="Default select example"
                  >
                    <option value="select">Select</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                  </select>
                  {formik.errors.type && (
                    <div style={{ color: "red" }}>{formik.errors.type}</div>
                  )}
                </div>
              </div>

              <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Sign Up
              </button>
              <hr />
              <Link className="links" onClick={props.toggle}>
                Already account ? Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
