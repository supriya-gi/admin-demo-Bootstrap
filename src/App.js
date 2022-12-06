import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Manager from "./manager/Manager";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Employee from "./manager/Employee";
function App() {
  const [toggleForm, setToggleForm] = useState(true);
  const formMode = () => {
    setToggleForm(!toggleForm);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              toggleForm ? (
                <Login toggle={() => formMode()} />
              ) : (
                <SignUp toggle={() => formMode()} />
              )
            }
          />
          <Route path="/manager" element={<Manager />} />
          <Route path="/employee/:uid" element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
