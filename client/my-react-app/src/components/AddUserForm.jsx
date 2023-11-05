import { useState } from "react";
import { axiosPrivate } from "../services/api";

const AddUserForm = (Props) => {
  const { onClose, onAddUser } = Props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions to add the user with the provided data
    if (ConPassword === password) {
      const data = {
        firstName,
        lastName,
        email,
        password,
        userName,
      };
      axiosPrivate
        .post("/register", data)
        .then(() => {
          setAlertMessage("User added successfully!");
        })
        .catch((err) => setAlertMessage("Error adding user: " + err.message));
      onClose();
    } else {
      setAlertMessage("Passwords do not match.");
    }
  };

  return (
    <div className="add-user-form">
      {alertMessage && <div className="alert-message">{alertMessage}</div>}

      <form onSubmit={handleSubmit}>
        <label style={{ color: "white" }}>First Name :</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label style={{ color: "white" }}>Last Name :</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />

        <label style={{ color: "white" }}>
          Email
          <span style={{ color: "red" }}>*</span>:
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label style={{ color: "white" }}>
          User Name <span style={{ color: "red" }}>*</span>:
        </label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <br />

        <label style={{ color: "white" }}>Confirm Password :</label>
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label style={{ color: "white" }}>Password:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <br />

        <button style={{ color: "Red" }} type="submit">
          Submit
        </button>
      </form>
      <button style={{ color: "yellow" }} onClick={onClose}>
        Cancel
      </button>
    </div>
  );
};

export default AddUserForm;
