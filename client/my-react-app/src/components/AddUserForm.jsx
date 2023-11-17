import { useState } from "react";
import axios from "../services/api";
import { TextField } from "@mui/material";

const AddUserForm = (Props) => {
  const { onClose } = Props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        withCredentials: true,
      })
      .then(() => {
        setAlertMessage("User added successfully!");
        onClose();
      })
      .catch((err) => setAlertMessage("Error adding user: " + err.message));
  };

  return (
    <>
      {alertMessage && (
        <div className="alert alert-error alert-message">
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
          <span className="AlertMsg">{alertMessage}.</span>
        </div>
      )}
      <form
        className=" flex flex-col items-center h-full w-full max-w-xs justify-around"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full h-2/3 justify-around">
          <div className="w-fit flex gap-2">
            <TextField
              color="secondary"
              id="outlined-basic"
              label="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <TextField
              color="secondary"
              id="outlined-basic"
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <TextField
            color="secondary"
            required
            id="outlined-required"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            color="secondary"
            required
            id="outlined-required"
            label="Username"
          />
          <TextField
            value={password}
            color="secondary"
            id="outlined-basic"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="Image-input">
          <input
            className="file-input input-sm w-full max-w-xs self-center"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button
          className="btn btn-md btn-secondary btn-outline max-w-xs self-center w-full"
          type="submit"
        >
          Submit
        </button>
        <button
          className="btn btn-error btn-outline btn-md  w-3/5 self-center max-w-xs"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default AddUserForm;
