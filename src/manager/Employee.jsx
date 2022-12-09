import React, { useState, useEffect } from "react";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

function Employee() {
  const { uid } = useParams();
  const Navigate = useNavigate();
  const [toggleForm, setToggleForm] = useState(true);
  const formMode = () => {
    setToggleForm(!toggleForm);
  };
  const [rows, setRows] = useState([]);

  const logOut = (e) => {
    e.preventDefault();
    Navigate("/");
  };

  const handleData = async () => {
    try {
      const booking = query(
        collection(db, "Employee"),
        where("uid", "==", uid),
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
  }, [uid]);
  return (
    <div className="container mt-5">
      {/* <div className="row">
        <div className="col-md-12">
          <div className="col-md-10  offset-lg-1">
            <table class="table table-bordered">
              <thead>
                <tr>
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
                    <td>{row.dept}</td>
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
      <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
        <div class="block w-full overflow-x-auto">
          <table class="items-center bg-transparent w-full border-collapse ">
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
                    {row.dept}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button
        type="submit"
        class="bg-slate-700 text-white px-3 py-2 rounded text-md font-semibold"
        onClick={logOut}
      >
        Logout
      </button>
    </div>
  );
}

export default Employee;
