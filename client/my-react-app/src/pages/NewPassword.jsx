// PasswordResetPage.js
import { useState } from "react";
import { axiosPrivateUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import LeftSideLog from "../containers/LeftSideLog";
function NewPassword(Props) {
  const { navVisible } = Props;
  const queryParameters = new URLSearchParams(window.location.search);
  const token = queryParameters.get("token");
  const id = queryParameters.get("id");
  const [password, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const data = {
      userId: id,
      token: token,
      password: password,
    };
    console.log(`
    userId: ${id},
    token: ${token},
    password: ${password}
  `);
    axiosPrivateUser
      .post(`http://localhost:3125/resetPassword`, data)
      .then(() => {
        console.log("Reset password succed ");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Password reset failed. Please try again.");
        setTimeout(() => {
          setMessage(false);
        }, 2000);
      });
  };

  return (
    <div className={navVisible ? "page page-with-navbar" : "page"}>
      {!message && (
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
      )}
      <div className="bg-primary w-1/3 absolute h-full right-0 z-0">
        <LeftSideLog message={"Enter New Password"} />
      </div>
      <div className="Login-Content">
        <form className="login-Form" onSubmit={handleResetPassword}>
          <label className="text-roboto text-lg">Enter New Password:</label>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-roboto">New Password:</span>
            </label>
            <input
              className="input input-accent input-sm w-full"
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button
            className="btn btn-outline font-semibold btn-primary"
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPassword;
