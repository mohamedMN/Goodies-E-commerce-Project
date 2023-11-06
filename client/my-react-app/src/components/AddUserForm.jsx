import { useState } from "react";
import axios from "../services/api";

const AddUserForm = (Props) => {
  const { onClose } = Props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [image, setImage] = useState(null); // Store the selected image
  const formData = new FormData(); // Create a FormData object

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform actions to add the user with the provided data
    if (ConPassword === password) {
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("userName", userName);
      if (image) {
        formData.append("image", image); // Append the image file to the FormData
      }

      await axios
        .post("/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Use multipart form data
          },
        })
        .then(() => {
          setAlertMessage("User added successfully!");
          onClose();
        })
        .catch((err) => setAlertMessage("Error adding user: " + err.message));
    } else {
      setAlertMessage("Passwords do not match.");
    }
  };

  return (
    <div className="add-user-form">
      {alertMessage && (
        <div className="alert-message" style={{ color: "Red" }}>
          {alertMessage}
        </div>
      )}

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
          type="text"
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
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
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
