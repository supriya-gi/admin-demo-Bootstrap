import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRememberMe] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleCheck = (e) => {
    setRememberMe(e.target.checked);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

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
        return "No user Found";
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div class="login-page bg-light">
      <div className="container ">
        <div className="row ">
          <div className="offset-lg-3 col-lg-5 col-md-8 offset-lg-1 ">
            <form
              onSubmit={(e) => handleLogin(e)}
              className="border p-5  bg-white shadow rounded"
            >
              <h2>Login</h2>
              <div class="col-12 mt-4">
                <label className="text-left">
                  Username<span class="text-danger">*</span>
                </label>
                <div class="input-group mt-2">
                  <div class="input-group-text">
                    <i class="bi bi-person-fill"></i>
                  </div>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      handleEmail(e);
                    }}
                  />
                </div>
              </div>

              <div class="col-12 mt-3 ">
                <label>
                  Password<span class="text-danger">*</span>
                </label>
                <div class="input-group mt-2">
                  <div class="input-group-text">
                    <i class="bi bi-lock-fill"></i>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    id="pwd"
                    placeholder="Enter password"
                    onChange={(e) => {
                      handlePassword(e);
                    }}
                    name="password"
                    value={password}
                  />
                </div>
              </div>

              <div className="form-check mb-3 mt-4 col-12">
                <label className="form-check-label">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="remember"
                    value={remember}
                    onChange={(e) => handleCheck(e)}
                  />
                  Remember me
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <hr />
              <Link className="links" onClick={props.toggle}>
                Don't have an account ? Sign Up
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
