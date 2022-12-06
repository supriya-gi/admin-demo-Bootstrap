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
      <div className="row">
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
      </div>
    </div>
  );
}

export default Employee;
