import { useEffect, useState } from "react";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../services/api";

const User = (Props) => {
  const { navVisible } = Props;

  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const [user, setUser] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosPrivate.get("/profile");
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
        <div className="profile">
          <div className="profile-image">{/* image */}</div>
          <div className="profile-info">
            {user && images ? (
              <img
                src={`data:image/jpeg;base64,${images}`}
                alt={`Uploaded Image`}
              />
            ) : (
              <p>No image available</p>
            )}
            <br />

            <h2 className="username">user_name : {user.user_name}</h2>
            <h2 className="username"> first_name : {user.first_name}</h2>
            <h2 className="username">email :{user.email}</h2>
            <p className="username">role :{user.role}</p>
            <br />
          </div>
          <br />

          <button
            className="signOutBtn"
            style={{ color: "Red" }}
            onClick={() => navigate("/dashboard")}
          >
            GO To Dashboard
          </button>
          <br />
          <span>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </span>
        </div>{" "}
      </div>
    </>
  );
};

export default User;
