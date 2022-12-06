import React, { useState, useEffect } from "react";
import { query, collection, getDocs, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import DropDown from "../components/DropDown";
import { useNavigate } from "react-router-dom";

function Manager() {
  const Navigate = useNavigate();
  const [toggleForm, setToggleForm] = useState(true);
  const [querys, setQuerys] = useState(null);
  const formMode = () => {
    setToggleForm(!toggleForm);
  };
  const [rows, setRows] = useState([]);

  const logOut = (e) => {
    e.preventDefault();
    Navigate("/");
  };
  const handleQuery = async (e) => {
    setQuerys(e.target.value);
    let aa = e.target.value;
    if (aa == "1") {
      console.log("1");
      const queryRef = query(
        collection(db, "Employee"),
        where("type", "==", "employee"),
        where("dept", "==", "HR"),
        orderBy("salary", "desc")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(checkQuery);
      setRows(checkQuery);
      // setaa(checkQuery);
      return checkQuery;
    } else if (aa == "2") {
      console.log("2");
      const queryRef = query(
        collection(db, "Employee"),
        where("type", "==", "employee"),
        where("dept", "==", "It")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("checkQuery", checkQuery);
      console.log("snapshot", snapshot);
      setRows(checkQuery);
      // setaa(checkQuery);
      // return checkQuery;
    } else if (aa == "3") {
      console.log("3");
      const queryRef = query(
        collection(db, "Employee"),
        where("type", "==", "employee"),
        where("dept", "==", "It"),
        where("city", "==", "surat")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("check", checkQuery);
      setRows(checkQuery);
      // setaa(checkQuery);
      // return checkQuery;
    } else if (aa == "4") {
      console.log("4");
      const queryRef = query(
        collection(db, "Employee"),
        where("type", "==", "employee"),
        // where("dept", "==", "It"),
        orderBy("city", "", "A")
        // startAt("A" || "a")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(snapshot.docs);
      setRows(checkQuery);
      // setQuerys(checkQuery);
      // return snapshot.docs;
    } else if (aa == "5") {
      console.log("5");
      const queryRef = query(
        collection(db, "Employee"),
        where("type", "==", "employee"),
        where("dept", "==", "Sales")
        // orderBy("fname", "==", "desc")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(checkQuery);
      setRows(checkQuery);
      // setQuerys(checkQuery);
      return snapshot.docs;
    }
  };

  const handleData = async () => {
    try {
      const booking = query(
        collection(db, "Employee"),
        where("type", "==", "employee")
      );
      const snapshot = await getDocs(booking);
      const rows = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRows(rows);
    } catch (err) {
      console.log(err);
    }
    return rows;
  };
  useEffect(() => {
    handleData();
  }, []);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12">
          <div className="mb-4" onChange={(e) => handleQuery(e)} value={querys}>
            <input
              type="radio"
              name="gender"
              id="customRadioInline1"
              value="1"
              class="custom-control-input me-1"
            />

            <label
              class="custom-control-label me-5"
              htmlFor="customRadioInline1"
            >
              Dept.HR with Max salary
            </label>

            <input
              type="radio"
              name="gender"
              id="customRadioInline2"
              value="2"
              class="custom-control-input me-1"
            />
            <label
              class="custom-control-label me-5"
              htmlFor="customRadioInline2"
            >
              Dept.IT with Min salary
            </label>
            <input
              type="radio"
              name="gender"
              id="customRadioInline3"
              value="3"
              class="custom-control-input me-1"
            />
            <label
              class="custom-control-label me-5"
              htmlFor="customRadioInline3"
            >
              Dept.IT & location is Surat city
            </label>

            <input
              type="radio"
              name="gender"
              id="customRadioInline4"
              value="4"
              class="custom-control-input me-1"
            />
            <label
              class="custom-control-label me-5"
              htmlFor="customRadioInline4"
            >
              Dept.IT & location name is starting from A
            </label>

            <input
              type="radio"
              name="gender"
              id="customRadioInline5"
              value="5"
              class="custom-control-input me-1"
            />
            <label
              class="custom-control-label me-5"
              htmlFor="customRadioInline5"
            >
              Dept.Sales & descending order of employee name
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-10 offset-lg-1">
            <table class="table table-bordered">
              <thead>
                <tr className="bg-style">
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Hobbies</th>
                  <th>City</th>
                  <th>Salary</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr>
                    <td>{row.fname}</td>
                    <td>{row.lname}</td>
                    <td>{row.email}</td>
                    <td>{row.gender}</td>
                    <td>{row.hobbies}</td>
                    <td>{row.city}</td>
                    <td>{row.salary}</td>
                    <td>
                      <DropDown data={row} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="submit" class="btn btn-primary" onClick={logOut}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Manager;
