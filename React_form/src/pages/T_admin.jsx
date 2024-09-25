import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBDataTableV5, MDBBtn } from "mdbreact";
import "./T_admin.css";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import Popform from "../components/Popform";
import Pop_edit from "../components/Pop_edit";
import Pop_add from "../components/Pop_add";

function T_admin() {
  const [datatable, setDatatable] = useState({
    columns: [
      {
        label: "No.",
        field: "no",
        width: 50,
      },
      {
        label: "Class",
        field: "mainclass",
        width: 150,
      },
      {
        label: "Subclass",
        field: "subclass",
        width: 150,
      },
      {
        label: "StarterSkill",
        field: "skill",
        width: 150,
      },
      {
        label: "Stat",
        field: "initial_stat",
        width: 150,
      },
      {
        label: "Action",
        field: "action",
        width: 100,
      },
    ],
    rows: [],
  });
  // !pop up
  const [opened, { open, close }] = useDisclosure(false);

  const getdata = async () => {
    console.log("initial data fetching");
    try {
      const response = await axios.get("http://localhost:3001/api/get/predata");
      const data = response.data;
      const records = data.map((item, index) => ({
        no: index + 1,
        mainclass: item.class,
        subclass: item.subclass,
        skill: item.skill,
        initial_stat: item.initial_stat,
        action: (
          <>
            <Pop_edit />
            <Popform />
          </>
        ),
      }));
      setDatatable((prev) => ({ ...prev, rows: records }));
    } catch (error) {
      console.log("no data in db : ", error);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleEditClick = (index) => {
    alert(`Edit No.: ${index + 1}`);
    // Implement edit logic here
  };

  const handleDeleteClick = (index) => {
    alert(`Delete No.: ${index + 1}`);
    // Implement delete logic here
  };

  return (
    <div>
      <header className="top-of-page">
        <Pop_add />
      </header>
      <div className="table-container">
        <MDBDataTableV5
          entriesOptions={[10, 20, 25, 50, 100]}
          entries={10}
          pagesAmount={4}
          data={datatable}
        />
      </div>
    </div>
  );
}

export default T_admin;
