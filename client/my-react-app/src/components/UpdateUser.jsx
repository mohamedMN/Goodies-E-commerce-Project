import { useState } from "react";
import axios from "../services/api";
import { useSelector } from "react-redux";

const UpdateUser = (Props) => {
  const { onClose, id } = Props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [image, setImage] = useState(null); // Store the selected image
  const formData = new FormData(); // Create a FormData object

  const testingInfo = useSelector((state) => state.getAllUsers?.Data?.users); // getting all users
  const user = testingInfo.find((user) => user._id === id);
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  //   const passwordsDontMatch = () => {};
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
      setTimeout(() => {
        setAlertMessage(false);
      }, 2000);
    }
  };

  return (
    <motion.div className="Create-User-Form z-50">
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
      <div className="add-user-form">
        <form className="UserFormForm" onSubmit={handleSubmit}>
          <div className="Inputs-n-Labels">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">First Name:</span>
              </label>
              <input
                className="input input-sm input-bordered w-full max-w-xs"
                type="text"
                value={user.firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Last Name:</span>
              </label>
              <input
                className="input input-sm input-bordered w-full max-w-xs"
                type="text"
                value={user.lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email:</span>
                <span className="Label-text-alt text-red-700 font-semibold ">
                  *
                </span>
              </label>
              <label className="Label-User-Input"></label>
              <input
                className="input input-sm input-bordered w-full max-w-xs"
                type="text"
                value={user.email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Username:</span>
                <span className="Label-text-alt text-red-700 font-semibold ">
                  *
                </span>
              </label>
              <input
                className="input w-full input-sm input-bordered max-w-xs"
                type="text"
                value={user.userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password:</span>
              </label>
              <input
                className="input input-sm input-bordered w-full max-w-xs"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Confirm Password:</span>
              </label>
              <input
                className="input input-sm input-bordered w-full max-w-xs"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="Image-input">
            <input
              className="file-input input-sm  w-full max-w-xs"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="UserInfoResolveBtns">
            <button className="btn btn-sm btn-outline btn-base" type="submit">
              Submit
            </button>
            <button
              className="btn btn-outline btn-sm btn-error"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default UpdateUser;