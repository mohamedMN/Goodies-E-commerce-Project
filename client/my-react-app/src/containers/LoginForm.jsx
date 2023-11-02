import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "../redux/actions/AuthAction";
import { useLocation, useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, errorMessage] = useState(true);
  const dispatch = useDispatch();
  const userRef = useRef();
  const error = useSelector((state) => state.authReducer?.error);
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const user = useSelector((state) => state.authReducer?.authData);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    if (!error) {
      errorMessage('false creadialse')
    }
    if (user) {
      navigate(from, { replace: true })
    }
  }, [error, user])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    // console.log("data " + data.username + " password " + data.password);
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
      </div>
      <div className="button-Container">
        <button className="submit-Button" type="submit">
          Submit
        </button>
      </div>

      <div className={errorMessage ? "LoginErrorMessage" : "hidden"}>
        {message}
      </div>
    </form>
  );
}

export default LoginForm;
