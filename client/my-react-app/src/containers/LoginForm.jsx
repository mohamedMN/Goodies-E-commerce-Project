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
  const from = location.state?.from?.pathname || "/dashboard";
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
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Username:</span>
          </label>
          <input
            className="input w-full input-sm input-bordered max-w-xs"
            onChange={(e) => setUserName(e.target.value)}
            name="username"
            type="text"
            placeholder="Username"
            required
            ref={userRef}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password:</span>
          </label>
          <input
            className="input w-full input-sm input-bordered max-w-xs"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Password"
            required
          ></input>
        </div>
      </div>
      <div className="button-Container">
        <Link to={"/RequestForgetPassword"} className="Link">
          Forgot Password?
        </Link>
        <button className="btn" type="submit">
          Login
        </button>
      </div>
      {message && (
        <div className="alert w-fit alert-error LoginErrorMessage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              color="#fff"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-white">{message}.</span>
        </div>
      )}
    </form>
  );
}

export default LoginForm;
