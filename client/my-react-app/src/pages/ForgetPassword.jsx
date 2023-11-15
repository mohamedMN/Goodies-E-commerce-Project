import { useState } from "react";
import { axiosPrivateUser } from "../services/api";
import LeftSideLog from "../containers/LeftSideLog";
import { Link } from "react-router-dom";

const RequestForgetPassword = (Props) => {
  const { navVisible } = Props;
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        })
        .catch(() => {
          setMessage("Password reset request failed. Please try again.");
          setTimeout(()=>{
            setMessage(false)
          },2000)
        });
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className={navVisible ? "page page-with-navbar" : "page"}>
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
      <div className="bg-primary w-1/3 absolute h-full right-0 z-0">
        <LeftSideLog
          message={"Forgot Password?"}        />
      </div>
      <div className="w-7/12 sm:w-6/12 md:w-6/12 lg:w-5/12 xl:w-4/12 2xl:w-1/3 h-3/5 flex shadow-md p-4 shadow-primary bg-secondary rounded-2xl relative right-[14%]">
        <div className="w-full h-full flex justify-center" >
          <form
            className="items-center text-center flex flex-col h-full justify-evenly w-4/5 "
            method="get"
            onSubmit={handleSubmit}
          >
            <h2 className="font-roboto text-lg">Forgot Password?</h2>
            <span className="font-roboto w-fit text-base text-primary">
              Enter your email to reset your password:
            </span>
            <div className="flex flex-col w-full h-1/2 justify-around">
            <div className="form-control">

              <input
                className="input input-ghost input-sm w-4/5 self-center"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
              <button className="btn btn-outline font-semibold btn-primary w-2/5 self-center">
                Reset Password
              </button>
              <Link className="Link underline" to={"/login"}>
                Back To Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestForgetPassword;
