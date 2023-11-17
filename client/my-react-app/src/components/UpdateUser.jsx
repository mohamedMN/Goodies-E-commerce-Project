import { useEffect, useRef, useState } from "react";
import { cleanUpdateId } from "../redux/actions/AuthAction";
import { useDispatch, useSelector } from "react-redux";
import { axiosPrivateUser } from "../services/api";
import TextField from "@mui/material/TextField";
import {
  MdVisibility as Visibility,
  MdVisibilityOff as VisibilityOff,
} from "react-icons/md";
import { motion } from "framer-motion";
import { InputAdornment } from "@mui/material";

const UpdateUser = (Props) => {
  const { onClose, id } = Props;
  const [showPassword, setShowPassword] = useState(false);
  const testingInfo = useSelector((state) => state.getAllUsers?.Data?.users); // aLL users
  const user = testingInfo.filter((e) => e._id.toLowerCase().includes(id));
  const [firstName, setFirstName] = useState(user[0].first_name);
  const [lastName, setLastName] = useState(user[0].last_name);
  const [email, setEmail] = useState(user[0].email);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState(user[0].user_name);
  const [alertMessage, setAlertMessage] = useState("");
  // const [image, setImage] = useState(null); // Store the selected image
  const formData = new FormData(); // Create a FormData object

  const dispatch = useDispatch(); // clear the inputs when it Close

  const inputRef = useRef(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  // console.log("user " + JSON.stringify(user));

  // const handleFileChange = (e) => {
  //   setImage(e.target.files[0]);
  // };
  // const passwordsDontMatch = () => {};
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform actions to add the user with the provided data
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("userName", userName);

    console.log("firstName " + firstName);
    console.log("lastName " + lastName);
    console.log("email " + email);
    console.log("userName " + userName);
    // if (image) {
    //   formData.append("image", image); // Append the image file to the FormData
    // }

    await axiosPrivateUser
      .post(`/id/${id}`, formData)
      .then(() => {
        setAlertMessage("User Updated successfully!");
        console.log("Update USer Success");
        onClose();
      })
      .catch((err) => setAlertMessage("Error Updated user: " + err.message));
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
      <motion.div className="h-full ">
        <form
          drag
          className="flex flex-col items-center h-full max-w-xs justify-around"
          onSubmit={handleSubmit}
        >
          <div className="Inputs-n-Labels h-4/6 flex flex-col justify-around">
            <div className="w-full flex gap-2">
              <TextField
                color="secondary"
                required
                id="outlined-required"
                label="First Name"
                defaultValue={user[0].first_name}
                ref={inputRef}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                required
                color="secondary"
                id="outlined-required"
                label="Last Name"
                value={user.lastName}
                defaultValue={user[0].last_name}
                onChange={(e) => setLastName(e.target.value)}
                ref={inputRef}
              />
            </div>
            <TextField
              required
              id="outlined-required"
              color="secondary"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              ref={inputRef}
              defaultValue={user[0].email}
            />
            <TextField
              required
              color="secondary"
              id="outlined-required"
              label="Username"
              defaultValue={user[0].user_name}
              onChange={(e) => setUserName(e.target.value)}
              ref={inputRef}
            />
            <TextField
              defaultValue={user[0].password}
              id="outlined-password-input"
              label="Password"
              type={showPassword ? "password" : "text"}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showPassword ? (
                  <Visibility
                    size={22}
                    className="cursor-pointer"
                    onClick={handleClickShowPassword}
                  />
                ) : (
                  <VisibilityOff
                    className="cursor-pointer"
                    size={22}
                    onClick={handleClickShowPassword}
                  />
                )}
              </InputAdornment>
            ),
          }}
            />
          </div>
          {/* <div className="Image-input">
            <input
              className="file-input input-sm w-full max-w-xs self-center"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div> */}
          <button
            className="btn btn-md btn-outline btn-secondary max-w-xs w-full self-center"
            type="submit"
          >
            Submit
          </button>
          <button
            className="btn btn-outline btn-md max-w-xs self-center w-2/3 btn-error"
            onClick={() => {
              onClose();
              dispatch(cleanUpdateId());
            }}
          >
            Cancel
          </button>
        </form>
      </motion.div>
    </>
  );
};
export default UpdateUser;
