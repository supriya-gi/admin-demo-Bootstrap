import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function DropDown({ data }) {
  const [depts, setDepts] = useState("");
  const handleChange = (e, uid) => {
    console.log("e", e, uid);
    updateDept(uid, e.target.value);
    setDepts(e.target.value);
  };
  //dept ===e.target.value
  const updateDept = async (uid, depts) => {
    const blogRef = doc(db, `Employee`, `${uid}`);
    await updateDoc(blogRef, {
      dept: depts,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // console.log(data);
    setDepts(data.dept);
  }, [data.dept]);
  return (
    <div>
      <select
        class="form-select form-select-lg"
        value={depts}
        onChange={(e) => {
          handleChange(e, data.id);
        }}
      >
        <option value={"select"}>Select</option>
        <option value={"HR"}>HR</option>
        <option value={"Sales"}>Sales</option>
        <option value={"It"}>IT</option>
      </select>
    </div>
  );
}

export default DropDown;
