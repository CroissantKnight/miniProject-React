import React, { useState, useEffect } from "react";
// import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function T_user() {
  const [predata, setPredata] = useState([]);
  const [records, setRecords] = useState([]);
  const getdata = async () => {
    console.log("initial data fetching");
    try {
      const response = await axios.get("http://localhost:3001/api/get/predata");
      const data = response.data;
      setPredata(data);
      console.log(data);
    } catch (error) {
      console.log("no data in db : ", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    const arrayData = () => {
      const records = predata.map((item) => ({
        mainclass: item.class,
        subclass: item.subclass,
        skill: item.skill,
        initial_stat: item.initial_stat,
      }));
      setRecords(records);
    };

    arrayData();
  }, [predata]);

  const handleEditClick = (index) => {
    alert(`Edit No.: ${index + 1}`);
    // Implement edit logic here
  };

  const handleDeleteClick = (index) => {
    alert(`Delete No.: ${index + 1}`);
    // Implement delete logic here
  };

  return (
    <>
      {/* <div>
        <button onClick={getdata}>Get Data</button>
      </div> */}
      {/* <h2>Dynamic Table with 20 Records</h2> */}{" "}
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Class</th>
            <th>Subclass</th>
            <th>StarterSkill</th>
            <th>Stat</th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{record.mainclass}</td>
              <td>{record.subclass}</td>
              <td>{record.skill}</td>
              <td>{record.initial_stat}</td>
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(index);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(index);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>{" "}
    </>
  );
}

export default T_user;
