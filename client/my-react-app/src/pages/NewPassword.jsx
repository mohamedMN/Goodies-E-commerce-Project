// PasswordResetPage.js
import { useState } from "react";
import { axiosPrivate } from "../services/api";

function PasswordResetPage() {
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  const token = queryParameters.get("token");
  const [password, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

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
    axiosPrivate
      // .post(`http://localhost:3125/resetPassword?token=${token}&id=${id}`, {
      .post(`http://localhost:3125/resetPassword`, data)
      .then(() => {
        setMessage("Reset password succed ");
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

export default PasswordResetPage;
