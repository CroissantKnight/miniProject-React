import React from "react";
// import "./LoginPage.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";

function LoginForm() {
  //   const [accountList, setAccountList] = useState([]);

  //   const getAccountList = () => {
  //     Axios.get("http://localhost:3001/index").then((response) => {
  //       setAccountList(response.data);
  //     });
  //   };

  //   const handleLogin = () => {
  //     console.log("press login");
  //   };

  return (
    <div>dfsa
      <div className="wrapper">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="button-box">
            <button type="submit">Login</button>
            {/* { {accountList.map((val, key) => {
              return (
                <div className="account-card">
                  <div className="card-body text-left">
                    <p className="card-text">user name : {val.user_name}</p>
                    <p className="card-text">password : {val.pass_word}</p>
                    <p className="card-text">email: {val.email}</p>
                    <p className="card-text">permission : {val.permission}</p>
                  </div>
                </div>
              );
            })} } */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
