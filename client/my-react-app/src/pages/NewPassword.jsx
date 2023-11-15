// PasswordResetPage.js
import { useState } from "react";
import { axiosPrivateUser } from "../services/api";
import { useNavigate } from "react-router-dom";
function NewPassword() {
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
      });
  };

  return (
    <div className="Login-Content">
      <form className="login-Form" onSubmit={handleResetPassword}>
        <h2 style={{ color: "white" }}>Password Reset Page</h2>

        <label style={{ color: "white" }}>New Password:</label>
        <input
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit" style={{ color: "Pink" }}>
          Reset Password
        </button>
        <p style={{ color: "Red" }}>{message}</p>
      </form>
    </div>
  );
}

export default NewPassword;
