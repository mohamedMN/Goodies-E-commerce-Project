import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogIn } from "../redux/actions/AuthAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./../styles/LoginForm.css";
// import { loading } from "../redux/actions/AuthAction";

function LoginForm() {
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
    isLoading(true);
    dispatch(LogIn(data));
  };
  return (
    <form className="w-full h-full flex flex-col justify-around" method="post" onSubmit={handleSubmit}>
      <h1 className="font-roboto font-bold text-center text-primary z-50 text-xl  xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl">Log in</h1>
      <div className="flex flex-col justify-around">
        <div className="form-control w-full max-w-xs self-center">
          <label className="label">
            <span className="label-text text-xs sm:text-xs md:text-sm xl:text-sm 2xl:text-base">Username:</span>
          </label>
          <input
            className="input w-full sm:input-sm md:input-sm input-bordered max-w-xs"
            onChange={(e) => setUserName(e.target.value)}
            name="username"
            type="text"
            placeholder="Username"
            required
            ref={userRef}
          />
        </div>
        <div className="form-control w-full self-center max-w-xs">
          <label className="label">
            <span className="label-text text-xs sm:text-xs md:text-sm xl:text-sm 2xl:text-base">Password:</span>
          </label>
          <input
className="input w-full sm:input-sm md:input-sm input-bordered max-w-xs"            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Password"
            required
          ></input>
        </div>
      </div>
      <button className="btn btn-outline max-w-xs self-center w-3/5" type="submit">
        Login
      </button>
      <div className=" justify-around items-center flex">
        <Link to={"/RequestForgetPassword"} className="Link  sm:text-xs md:text-sm xl:text-sm 2xl:text-base text-center font-roboto text-xs underline">
          Forgot Password?
        </Link>
        {loading && (
          <span className="loading loading-spinner text-primary text-sm sm:text-sm md:text-sm xl:text-md 2xl:text-xl" ></span>
        )}
        <Link className="sm:text-xs md:text-sm xl:text-sm 2xl:text-base text-center font-roboto underline text-xs Link">Contact Admin?</Link>
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
