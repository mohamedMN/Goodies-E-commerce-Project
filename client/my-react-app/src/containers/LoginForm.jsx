import React, { useState } from "react";
import axios from "axios"
  
  function LoginForm() {
    const [Info, setInfo] = useState({
      username: "",
      password: "",
    });

  //handling submit
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
  return(
    <form className="login-Form" method="post" onSubmit={handleSubmit}>
      <div className="form-Container">
        <div className="label-Container">
          <label className="label-Login-Form">Username:</label>
          <label className="label-Login-Form">Password:</label>
        </div>
        <div className="input-Container">
          <input
            className="input-Login-Form"
            name="username"
            type="text"
            placeholder=""
            required
          ></input>
          <input
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
    </form>
  );
    } ;

export default LoginForm;
