import { useState } from "react";
import { axiosPrivate } from "../services/api";

const RequestForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: email,
      };
      console.log("email " + data.email);

      await axiosPrivate
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
    <div className="Login-Content">
      <form className="login-Form" method="get" onSubmit={handleSubmit}>
        <h2 style={{ color: "white" }}>Forget Password</h2>
        <p style={{ color: "white" }}>
          Enter your email to reset your password:
        </p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button style={{ color: "Red" }}>Reset Password</button>
        <p style={{ color: "white" }}>{message}</p>
      </form>
    </div>
  );
};

export default RequestForgetPassword;
