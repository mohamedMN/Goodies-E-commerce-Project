import { AiOutlineDelete, AiOutlineEllipsis } from "react-icons/ai";
import { axiosPrivate } from "../services/api";
import { useState } from "react";
import { useSelector } from "react-redux";

const UserComponent = (Props) => {
  const { managersInfo } = Props;
  const [isDeleted, setIsDeleted] = useState(false);
  const user = useSelector((state) => state.authReducer?.authData);
  const [showManagerAlert, setShowManagerAlert] = useState(false);

  const handleUserDelete = (id) => {
    axiosPrivate
      .delete(`/users/${id}`)
      .then((response) => {
        // Handle the response from the server (e.g., show a success message)
        console.log("User deleted successfully", response.data);
        setIsDeleted(true); // Set the deleted state to true
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        setShowManagerAlert(true);
        console.error("Error deleting user", error);
      });
  };
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  const handleUserUpdate = () => {};

  return (
    <div className="manager-Container">
      {showManagerAlert && (
        <div className="manager-alert">
          Alert: you don't permission just for Admin !!!
        </div>
      )}
      <div className="manager-Info">
        {isDeleted ? (
          <p>User deleted successfully!</p>
        ) : (
          <>
            <label>{managersInfo._id}</label>
            <label>{managersInfo.role}</label>
            <label>{managersInfo.user_name}</label>
            <button onClick={() => handleUserDelete(managersInfo._id)}>
              <AiOutlineDelete />
            </button>
            <button onClick={() => handleUserUpdate()}>
              <AiOutlineEllipsis />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserComponent;
