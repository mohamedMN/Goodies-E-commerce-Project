<<<<<<< Updated upstream
import React, { useState } from "react";
import { useSignIn } from "react-auth-kit"
import axios from "axios"
function LoginForm() {
  const [Info, setInfo] = useState({
    username: "",
    password: "",
  });
  const signIn = useSignIn;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
=======
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LoginForm() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const userRef = useRef();
  
  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("data " + data.username + " password " + data.password);
    try {
      const response = await axios.post(
        "http://localhost:3125/authentication",
        data,
        config
      );
      if (response.status >= 200 || response.status <= 400) {
        const accessToken = response.data.accessToken;
        console.log(accessToken)
        navigate("/home")
      }else {
        console.log(response.status)
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(
        "Authentication failed. Please check your credentials."
      );
      console.log(errorMessage)      
    }
>>>>>>> Stashed changes
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(Info)
    try{
        const res = await axios.post(
            "http://localhost:3125/authentication",
             JSON.stringify(Info))
          if (res.status === 200) {
              console.log("Request was successful");
              console.log(res.data); 
            } else {
              console.log(`Request failed with status ${res.status}`);
            }
          } catch (error) {
            console.error("An error occurred:", error);
          }  
};
  return (
    <form className="login-Form" method="post" onSubmit={handleSubmit}>
      <div className="form-Container">
        <div className="label-Container">
          <label className="label-Login-Form">Username:</label>
          <label className="label-Login-Form">Password:</label>
        </div>
        <div className="input-Container">
          <input
            onChange={handleChange}
            className="input-Login-Form"
            name="username"
            type="text"
            placeholder=""
            required
          ></input>
          <input
            onChange={handleChange}
            className="input-Login-Form"
            name="password"
            type="password"
            placeholder=""
            required
          ></input>
        </div>
      </div>
      <div className="button-Container">
      <button className="submit-Button" type="submit">Submit</button>
      </div>

      <div className={errorMessage?"LoginErrorMessage":"hidden"}>
   {errorMessage}
      </div>
    </form>
  );
}

export default LoginForm;
