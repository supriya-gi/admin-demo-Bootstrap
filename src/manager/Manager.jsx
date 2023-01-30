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
      {/* <div className="row mb-5">
        <div className="d-flex" onChange={(e) => handleQuery(e)} value={querys}>
          <div class="form-check me-5">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="1"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Dept.HR with Max salary
            </label>
          </div>
          <div class="form-check me-5">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value="2"
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Dept.IT with Min salary
            </label>
          </div>
          <div class="form-check me-5">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value="3"
              id="flexRadioDefault3"
            />
            <label class="form-check-label" for="flexRadioDefault3">
              Dept.IT & location is Surat city
            </label>
          </div>

          <div class="form-check me-5">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              value="4"
              id="flexRadioDefault4"
            />
            <label class="form-check-label" for="flexRadioDefault4">
              Dept.IT & city starting from A
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              value="5"
              name="flexRadioDefault"
              id="flexRadioDefault5"
            />
            <label class="form-check-label" for="flexRadioDefault5">
              Dept.Sales & descending order of employee name
            </label>
          </div>
        </div>
      </div> */}

      <div
        className="relative flex flex-col lg:flex-row md:flex-row min-w-0 break-words bg-white w-full mb-6 "
        onChange={(e) => handleQuery(e)}
        value={querys}
      >
        <div className="flex items-center mr-6 ">
          <input
            id="default-radio-1"
            type="radio"
            value="1"
            name="default-radio"
            className=" h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-radio-1"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Dept.HR with Max salary
          </label>
        </div>

        <div className="flex items-center mr-6 ">
          <input
            id="default-radio-2"
            type="radio"
            name="default-radio"
            value="2"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-radio-2"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Dept.IT with Min salary
          </label>
        </div>
        <div className="flex items-center mr-6 ">
          <input
            id="default-radio-3"
            type="radio"
            value="3"
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-radio-3"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Dept.IT & location is Surat city
          </label>
        </div>
        <div className="flex items-center mr-6 ">
          <input
            id="default-radio-4"
            type="radio"
            value="4"
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-radio-4"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Dept.IT & city starting from A
          </label>
        </div>
        <div className="flex items-center mr-6 ">
          <input
            id="default-radio-5"
            type="radio"
            value="5"
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="default-radio-5"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Dept.Sales & descending order of employee name
          </label>
        </div>
      </div>

      {/* <div className="row">
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
      </div> */}

      {/* <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24"> */}
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
        <div class="block w-full overflow-x-auto">
          <table class="items-center bg-transparent w-full border-collapse shadow ">
            <thead>
              <tr>
                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                  Firstname
                </th>
                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                  Lastname
                </th>
                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                  Email
                </th>
                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                  Gender
                </th>
                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                  Hobbies
                </th>
                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                  City
                </th>
                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Salary
                </th>
                <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Department
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                    {row.fname}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                    {row.lname}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                    {row.email}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                    {row.gender}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                    {row.hobbies}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                    {row.city}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                    {row.salary}
                  </td>
                  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                    <DropDown data={row} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* </div> */}
      <button
        type="submit"
        class="bg-slate-700 text-white px-3 py-2 rounded text-md font-semibold"
        onClick={logOut}
      >
        Logout
      </button>
      {/* </div> */}
    </div>
  );
}

export default Manager;
