import { useEffect, useState } from "react";
import "../styles/Profilepage.css";
import { useNavigate } from "react-router-dom";
import {  axiosPrivateUser } from "../services/api";

const Profile = (Props) => {
  const { navVisible } = Props;

  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const [user, setUser] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosPrivateUser.get("/profile");
        setUser(response.data);
        // const imageBlob = await response.image.image.blob();
        // const imageUrl = URL.createObjectURL(imageBlob);

        setImages([response.data.image.image]);
      } catch (error) {
        setErrorMessage("Error fetching Personal:");
        console.error("Error fetching Personal:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className={navVisible ? "page page-with-navbar" : "page"}>
        <div className="Profile-Container">
          <div className="Profile-info">
          <div className="ProfilePicContainer">
            {user && images ? (
              <img
              className="Profile-Picture"
                src={`data:image/jpeg;base64,${images}`}
                alt={`Uploaded Image`}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>

            <h2 className="UserData" style={{ color: "white" }} >Username : {user.user_name}</h2>
            <h2 className="UserData" style={{ color: "white" }}> First name : {user.first_name}</h2>
            <h2 className="UserData" style={{ color: "white" }}>Email :{user.email}</h2>
            <p className="UserData" style={{ color: "white" }}>Role :{user.role}</p>
          </div>

          <button
            className="btn btn-accent btn-outline"
            onClick={() => navigate("/dashboard")}
          >
            GO To Dashboard
          </button>
        </div>
        {errorMessage && (
        <div className="alert w-fit alert-error ProfilePageError">
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
          <span className="text-white">{errorMessage}.</span>
        </div>
      )}
      </div>
    </>
  );
};

export default Profile;
