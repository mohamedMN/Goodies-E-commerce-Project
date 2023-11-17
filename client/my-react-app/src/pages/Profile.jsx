import { useEffect, useState } from "react";
import "../styles/Profilepage.css";
import { useNavigate } from "react-router-dom";
import { axiosPrivateUser } from "../services/api";

const Profile = (Props) => {
  const { navVisible } = Props;
  const [isEditing, setIsEditing] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const handleEditMode = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosPrivateUser.get("/profile");
        setUser(response.data);
        // console.log(
        //   "response.data.image.image  " + JSON.stringify(response.data)
        // );
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
      <div
        className={
          navVisible
            ? "page page-with-navbar justify-center"
            : "page justify-center"
        }
      >
        <div className="flex flex-col h-3/5 w-4/6 bg-secondary rounded-3xl text-accent">
          <div className="h-full flex flex-col justify-around">
            <div className="flex flex-row-reverse items-center justify-around w-full">
              <div className="w-1/12 h-auto flex flex-col items-center justify-between">
                {user && images ? (
                  <img
                    className="w-full h-full rounded-full border-4 border-primary"
                    src={`data:image/jpeg;base64,${images}`}
                    alt={`Uploaded Image`}
                  />
                ) : (
                  <p>No image available</p>
                )}
                <h1 className="text-base-100 font-roboto ">
                  {user?.user_name}
                </h1>
              </div>
              <button
                onClick={handleEditMode}
                className="btn w-1/6 btn-accent btn-outline"
              >
                edit
              </button>
            </div>
            <div className="flex  w-full h-2/5 p-3">
              <div className="flex items-end flex-col justify-around ">
                <h2 className="UserData">Id: </h2>
                <h2 className="UserData"> First name : </h2>
                <h2 className="UserData">Email :</h2>
                <p className="UserData">Role :</p>
              </div>
              <div className="text-primary flex flex-col justify-around">
                <h2 className="UserData">{user.id}</h2>
                <h2 className="UserData">{user.first_name}</h2>
                <h2 className="UserData">{user.email}</h2>
                <p className="UserData">{user.role}</p>
                <p className="UserData">{user.last_logi}</p>
              </div>
            </div>

            <button
              className="btn btn-accent max-w-xs w-1/3 self-center btn-outline"
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
      </div>
    </>
  );
};

export default Profile;
