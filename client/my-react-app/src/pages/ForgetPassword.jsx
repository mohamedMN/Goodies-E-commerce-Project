import { useState } from "react";
import { axiosPrivateUser } from "../services/api";
import LeftSideLog from "../containers/LeftSideLog";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

const RequestForgetPassword = (Props) => {
  const { navVisible } = Props;
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const data = {
        email: email,
      };
      console.log("email " + data.email);

      await axiosPrivateUser
        .post("/PasswordRequest", data)
        .then((e) => {
          console.log("succes  " + e);
          setMessage("Password reset link sent to your email.");
          setTimeout(()=>{
            setMessage(false)
          },2000)
          setIsLoading(null)
        })
        .catch(() => {
          setMessage("Password reset request failed. Please try again.");
          setTimeout(()=>{
            setMessage(false)
          },2000)
          setIsLoading(null)
        });
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setIsLoading(null)
      setTimeout(()=>{
        setMessage(false)
      },2000)
    }
  };

  return (
    <div className={navVisible ? "page page-with-navbar flex-row-reverse" : "page flex-row-reverse"}>
    {message && 
          <div className="alert alert-error w-fit absolute z-50 top-2 right-2">
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
          <span className="AlertMsg">{message}.</span>
        </div>
        }
      <div className="bg-primary w-2/3  h-full  z-0">
        <LeftSideLog
          message={"Forgot Password?"}        />
      </div>
      <div className="h-full w-full flex items-center justify-center  ">

      <div className="w-7/12 sm:w-6/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-1/3 h-3/5 flex shadow-sm p-4 shadow-primary bg-primary rounded-2xl">
        <div className="w-full h-full flex justify-center" >
          <form
            className="items-center text-center flex flex-col h-5/8 justify-evenly w-4/5 "
            method="get"
            onSubmit={handleSubmit}
          >
            <h2 className="font-roboto text-base-100 text-lg">Forgot Password?</h2>
            <span className="font-roboto w-fit text-base text-base-100">
              Enter your email to reset your password:
            </span>
            <div className="flex flex-col w-full h-1/2 justify-around">
            <TextField
                className="h-1/3"
                color="primary"
                required
                id="outlined-required"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="py-2 h-2/3 justify-between w-full flex flex-col ">

              <button className="btn btn-outline font-semibold btn-secondary w-4/5 self-center">
                Reset Password
              </button>
              {
                isLoading && 
                <span className="loading loading-spinner self-center text-secondary text-sm sm:text-sm md:text-sm xl:text-md 2xl:text-xl"></span>
              }
              <Link className="Link underline" to={"/login"}>
                Back To Login
              </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default RequestForgetPassword;
