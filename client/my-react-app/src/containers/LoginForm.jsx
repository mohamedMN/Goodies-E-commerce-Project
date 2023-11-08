import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "../redux/actions/AuthAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./../styles/LoginForm.css";

function LoginForm() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, errorMessage] = useState(false);
  const dispatch = useDispatch();
  const userRef = useRef();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const error = useSelector((state) => state.authReducer?.error);
  const user = useSelector((state) => state.authReducer?.authData);
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    if (error) {
      errorMessage(
        "Password Or Username Wrong Verify Credintials Or Contact Your Administrator"
      );
      setTimeout(() => {
        errorMessage(false);
      }, 2000);
    }
    if (user) {
      navigate(from, { replace: true });
    }
  }, [error]);
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
      <h1 className="Header-Login">Log in</h1>
      <div className="form-Container">
        <label className="label-Login-Form">Username:</label>
        <input
          onChange={(e) => setUserName(e.target.value)}
          className="inputLoginForm"
          name="username"
          type="text"
          placeholder=""
          required
          ref={userRef}
        />
        <label className="label-Login-Form">Password:</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="inputLoginForm"
          name="password"
          type="password"
          placeholder=""
          required
        ></input>
      </div>
      <div className="button-Container">
        <Link to={"/RequestForgetPassword"} className="Link">
          Forgot Password?
        </Link>
        <button className="submit-Button" type="submit">
          Login
        </button>
      </div>

      <div className={message ? "LoginErrorMessage" : "hidden"}>
        {message}
        <div className="LoaderErr"></div>
      </div>
    </form>
  );
}

export default LoginForm;
