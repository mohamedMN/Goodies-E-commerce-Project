import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "../redux/actions/AuthAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./../styles/LoginForm.css";
import TextField from "@mui/material/TextField";
import {
  MdVisibility as Visibility,
  MdVisibilityOff as VisibilityOff,
} from "react-icons/md";
import { InputAdornment } from "@mui/material";
// import { loading } from "../redux/actions/AuthAction";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, errorMessage] = useState(false);
  const [loading, isLoading] = useState(false);
  const dispatch = useDispatch();
  const userRef = useRef();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const error = useSelector((state) => state.authReducer?.error);
  const user = useSelector((state) => state.authReducer?.authData);
  const navigate = useNavigate();
  // const isloading = useSelector((state) => state.authReducer?.loading);

  // to show Error Message each time user did mistake informations
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    if (error) {
      errorMessage(
        "Password Or Username Wrong Verify Credintials Or Contact Your Administrator"
      );
      isLoading(false);
      setTimeout(() => {
        errorMessage(false);
      }, 2000);
    }
    if (user) {
      navigate(from, { replace: true });
      isLoading(false);
    }
  }, [user, error]);

  // handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    isLoading(true);
    dispatch(LogIn(data));
  };
  return (
    <form
      className="w-full h-full flex flex-col justify-around"
      method="post"
      onSubmit={handleSubmit}
    >
      <h1 className="font-roboto font-bold text-center text-base-100 z-10 text-xl  xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl">
        Log in
      </h1>
      <div className="h-1/3 w-3/4 self-center justify-self-center flex flex-col justify-around">
        <TextField
          id="outlined"
          label="Username"
          name="username"
          type="text"
          placeholder="Username"
          required
          fullWidth
          ref={userRef}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type={showPassword ? "password" : "text"}
          autoComplete="current-password"
          name="password"
          placeholder="Password"
          required
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {" "}
                {showPassword ? (
                  <Visibility
                    size={22}
                    className="cursor-pointer"
                    onClick={handleClickShowPassword}
                  />
                ) : (
                  <VisibilityOff
                    className="cursor-pointer"
                    size={22}
                    onClick={handleClickShowPassword}
                  />
                )}
              </InputAdornment>
            ),
          }}
        />
      </div>
      <button
        className="btn btn-outline text-base-100 btn-secondary max-w-xs self-center w-3/5"
        type="submit"
      >
        Login
      </button>
      <div className=" justify-between w-full self-center items-center flex">
        <Link
          to={"/RequestForgetPassword"}
          className="Link  sm:text-xs md:text-sm xl:text-sm 2xl:text-base text-center font-roboto text-xs underline"
        >
          Forgot Password?
        </Link>
        {loading && (
          <span className="loading loading-spinner text-secondary text-sm sm:text-sm md:text-sm xl:text-md 2xl:text-xl"></span>
        )}
        <Link className="sm:text-xs md:text-sm xl:text-sm 2xl:text-base text-center font-roboto underline text-xs Link">
          Contact Admin?
        </Link>
      </div>
      {message && (
        <div className="flex alert w-fit alert-error LoginErrorMessage z-50">
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
          <span className="text-white text-xs sm:text-xs md:text-sm lg:text-md xl:text-base 2xl:text-lg">{message}.</span>
        </div>
      )}
    </form>
  );
}

export default LoginForm;
