import {
  AiOutlineDelete,
  AiOutlineEllipsis,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { axiosPrivate } from "../services/api";
import { useState } from "react";
// import { useSelector } from "react-redux";

const UserComponent = (Props) => {
  const { managersInfo, index } = Props;
  const [isDeleted, setIsDeleted] = useState(false);
  // const user = useSelector((state) => state.authReducer?.authData);
  // const [showManagerAlert, setShowManagerAlert] = useState(false);

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
        // setShowManagerAlert(true);
        console.error("Error deleting user", error);
      });
  };

  // const [showAddUserForm, setShowAddUserForm] = useState(false);

  // const handleUserUpdate = () => {};

  return (
    <>
      {isDeleted ? (
        <p>User deleted successfully!</p>
      ) : (
        <tr className={index % 2 === 0 ? "Table-Row" : "Table-row-Dark"}>
          <td className="Table-Data" scope="row">
            <label>{managersInfo.user_name}</label>
          </td>
          <td className="Table-Data">
            <label>{managersInfo._id}</label>
          </td>
          <td className="Table-Data" scope="row">
            <label>{managersInfo.role}</label>
          </td>
          <td className="Table-Data" scope="row">
            <label>{managersInfo.email}</label>
          </td>
          <td className="Table-Data-functions" scope="col">
            <button onClick={() => handleUserDelete(managersInfo._id)}>
              <AiOutlineDelete />
            </button>
            <button onClick={() => {}}>
              <AiOutlineUserAdd />
            </button>{" "}
            <button onClick={() => {}}>
              <AiOutlineEllipsis />
            </button>
          </td>
        </tr>
      )}
    </>
  );
};

export default UserComponent;
