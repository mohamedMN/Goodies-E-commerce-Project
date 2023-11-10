import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_LOADING, LogIn   } from "../redux/actions/AuthAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./../styles/LoginForm.css";

function LoginForm() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, errorMessage] = useState(false);
  const [loading , isLoading] = useState(false)
  const dispatch = useDispatch();
  const userRef = useRef();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const error = useSelector((state) => state.authReducer?.error);
  const user = useSelector((state) => state.authReducer?.authData);
  const navigate = useNavigate();

  // to show Error Message each time user did mistake informations
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    if (error) {
      errorMessage("Password Or Username Wrong Verify Credintials Or Contact Your Administrator");
        isLoading(false);
        setTimeout(()=>{
          errorMessage(false)
        },2000)
      }
      if (user) {
        navigate(from, { replace: true });
        isLoading(false)
    }
  }, [user]);

  // handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    isLoading(true)
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
        <button className="btn btn-outline w-full" type="submit">
          Login
        </button>
      <div className="button-Container">
        <Link to={"/RequestForgetPassword"} className="Link">
          Forgot Password?
        </Link>
        {loading && 
          <span className="loading loading-spinner text-primary"></span>}
        <Link  className="Link">
          Contact Admin?
        </Link>
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
