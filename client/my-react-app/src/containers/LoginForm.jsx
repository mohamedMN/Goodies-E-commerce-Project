import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { LogIn } from "../actions/AuthAction";

function LoginForm() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, errorMessage] = useState("");
  const dispatch = useDispatch();
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
    console.log("data " + data.username + " password " + data.password);
    dispatch(LogIn(data));
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
            onChange={(e) => setUserName(e.target.value)}
            className="input-Login-Form"
            name="username"
            type="text"
            placeholder=""
            required
            ref={userRef}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="input-Login-Form"
            name="password"
            type="password"
            placeholder=""
            required
            ref={userRef}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="button-Container">
        <button className="submit-Button" type="submit">
          Submit
        </button>
      </div>

      <div className={errorMessage ? "LoginErrorMessage" : "hidden"}>
        {errorMessage}
      </div>
    </form>
  );
}

export default LoginForm;
