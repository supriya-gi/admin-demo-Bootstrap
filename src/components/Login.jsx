import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import "../App.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const Navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [remember, setRememberMe] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  // const [submitted, setSubmitted] = useState(false);
  const { email, password } = inputs;
  // const handleEmail = (e) => {
  //   setEmail(e.target.value);
  // };
  useEffect(() => {
    setInputs({
      email: localStorage?.getItem("email"),
      password: localStorage?.getItem("password"),
    });
  }, []);
  // const handlePassword = (e) => {
  //   setPassword(e.target.value);
  // };
  // const handleCheck = (e) => {
  //   setRememberMe(e.target.checked);
  // };
  const handleCheck = (e) => {
    setRememberMe((pre) => !pre);
    // const { name, value } = e.target;
    // if (e.target.type === "checkbox" && !e.target.checked) {
    //   setInputs((inputs) => ({ ...inputs, [name]: "" }));
    // } else {
    //   setInputs((inputs) => ({ ...inputs, remember: !inputs.remember }));
    // }
    // setInputs((inputs) => ({ ...inputs, remember: !inputs.remember }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (remember) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    }
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;
      console.log(uid);
      const q = query(collection(db, "Employee"), where("uid", "==", uid));
      const docs = await getDocs(q);
      console.log(docs.docs[0].data().type);
      const type = docs.docs[0].data().type;
      console.log("type", type);

      if (type) {
        // setType(type);
        type === "manager"
          ? Navigate(`/manager`)
          : Navigate(`/employee/${uid}`);
      } else {
        toast("No user Found", { type: "error" });
        // return "No user Found";
      }
    } catch (error) {
      // console.log(error);
      toast("Invalid Credential", { type: "error" });
    }
  };
  return (
    <>
      <div className="flex min-h-full items-center justify-center bg-slate-100  py-8 px-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 p-10">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={(e) => handleLogin(e)}>
            <input type="hidden" name="remember" value="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="mb-3">
                <label for="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  required
                  className="relative block w-full shadow appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label for="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  className="relative block w-full shadow appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="password"
                  value={password}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  name="remember"
                  checked={remember}
                  onChange={(e) => handleCheck(e)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
              <hr />

              <Link className="links" onClick={props.toggle}>
                Don't have an account ? Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
