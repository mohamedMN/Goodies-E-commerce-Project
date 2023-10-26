import React, { useState } from "react";
import { useSignIn } from "react-auth-kit"
import axios from "axios"
function LoginForm() {
  const [Info, setInfo] = useState({
    Username: "",
    Password: "",
  });
  const signIn = useSignIn
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const res = await axios.post(
            "http://localhost:3125/authentication",
             Info
        )
        signIn({
            token: res.data.token,
            expiresIn: 3600,
            tokenType: "Bearer",
            authState: {'email': e.target.name}
        })
    }
    catch(err){
        console.log(err)
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
            name="Username"
            type="text"
            placeholder=""
            required
          ></input>
          <input
            onChange={handleChange}
            className="input-Login-Form"
            name="Password"
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
}

export default LoginForm;
