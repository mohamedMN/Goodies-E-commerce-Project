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
        });
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className={navVisible ? "page page-with-navbar" : "page"}>
      <div className="Background-Login">
        <LeftSideLog
          message={"Forgot Password?"}
          className="LeftSideLoginPage"
        />
      </div>
      <div className="Login-Content">
        <div className="w-3/4 h-full">
          <form
            className="items-center text-center flex flex-col h-full justify-evenly "
            method="get"
            onSubmit={handleSubmit}
          >
            <h2 className="font-roboto text-lg">Forgot Password?</h2>
            <p className="font-roboto">
              Enter your email to reset your password:
            </p>
            <div className="flex flex-col w-full h-1/2 justify-around  ">
              <input
                className="input input-ghost input-sm w-full"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-outline font-semibold btn-primary">
                Reset Password
              </button>
              <Link className="Link" to={"/login"}>
                Back To Login
              </Link>
            </div>
            <p style={{ color: "white" }}>{message}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestForgetPassword;
