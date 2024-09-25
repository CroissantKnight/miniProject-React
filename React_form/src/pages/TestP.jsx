import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
function TestP() {
  const navigate = useNavigate();
  //= create function forlink to user and admin page
  const login = async (event) => {
    event.preventDefault();
    try {
      const email = document.querySelector(
        'input[name="input_username"]'
      ).value;
      const password = document.querySelector(
        'input[name="input_password"]'
      ).value;
      // console.log("login pressed");
      // console.log(email, password);
      const response = await axios.post(
        "http://localhost:3001/api/post/login",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      console.log(response.data);
      //< navigate condition take to each page
      if (response.data.permissions == "admin") {
        navigate("/AdminP");
      } else {
        navigate("/UserP");
      }
    } catch (err) {
      console.log("Error logging in : ", err);
    }
  };

  //= use for check if this user still can signin
  const getuser = async (req, res) => {
    console.log(
      "============================get user pressed==============================="
    );
    try {
      const authotoken = localStorage.getItem("token");
      console.log(authotoken);
      const response = await axios.get(
        "http://localhost:3001/api/get/still-login",
        {
          headers: {
            Authorization: `Bearer ${authotoken}`,
          },
        }
      );
      console.log("System : ", response.data.message);
    } catch (error) {
      console.log("no user in db : ", error);
    }
  };
  //= test fetch data
  const getdata = async (req, res) => {
    console.log("getdata");
    try {
      const response = await axios.get("http://localhost:3001/api/get/predata");
      console.log(response.data);
    } catch (error) {
      console.log("no data in db : ", error);
    }
  };
  return (
    <div>
      <div className="wrapper">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input
              name="input_username"
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <br></br>
          <div className="input-box">
            <input
              name="input_password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <br></br>
          <div className="button-box">
            <button type="submit" onClick={login}>
              Login
            </button>
            <button type="submit" onClick={getuser}>
              get user
            </button>
            <button type="submit" onClick={getdata}>
              get data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TestP;
