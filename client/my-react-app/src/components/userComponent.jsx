import {
  AiOutlineDelete,
  AiOutlineEllipsis,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { axiosPrivate } from "../services/api";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { UpdateUser } from "../redux/actions/AuthAction";
// import { useSelector } from "react-redux";
const UserComponent = (Props) => {
  const { managersInfo } = Props;
  // const user = useSelector((state) => state.authReducer?.authData);
  // const [showManagerAlert, setShowManagerAlert] = useState(false);

  const dispatch = useDispatch();

  const handleUserDelete = (id) => {
    axiosPrivate
      .delete(`/users/${id}`)
      .then((response) => {
        console.log("User deleted successfully", response.data);
      })
      .catch((error) => {
        // setShowManagerAlert(true);
        console.error("Error deleting user", error);
      });
  };
  const showDeleteSwal = (id, username) => {
    Swal.fire({
      title: `Are you sure ?`,
      text: `${username}'s account will be deleted permanently`,
      icon: "warning",
      background: "#183D3D",
      backdrop: "#040D1280",
      color: "#B9B4C7",
      showCancelButton: true,
      confirmButtonColor: "#4BB543",
      cancelButtonColor: "#f87272",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleUserDelete(id);
        Swal.fire({
          title: "Deleted!",
          text: `${username} has been deleted.`,
          background: "#183D3D",
          backdrop: "#040D1290",
          color: "#B9B4C7",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // else{
      //   Swal.fire(
      //     {
      //       title:'Cancelled',
      //       text: `${username} has not been deleted.`,
      //       background : "#183D3D",
      //       backdrop: true,
      //       color: '#B9B4C7',
      //       icon: 'error',
      //       showConfirmButton: false,
      //       timer: 1500
      //     }
      //   )
      // }
    });
  };

  // const [id, setId] = useState("");
  const handleUserUpdate = (id) => {
    dispatch(UpdateUser(id));
  };

  return (
    <>
      {/* {showAddUserForm && (
        <UpdateUser onClose={() => setShowAddUserForm(false)} id={id} />
      )} */}
      <tr className="Table-Row">
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
          <button
            onClick={() =>
              showDeleteSwal(managersInfo._id, managersInfo.user_name)
            }
          >
            <AiOutlineDelete />
          </button>
          <button onClick={() => {}}>
            <AiOutlineUserAdd />
          </button>{" "}
          <button
            onClick={() => {
              handleUserUpdate(managersInfo._id);
            }}
          >
            <AiOutlineEllipsis />
          </button>
        </td>
      </tr>
    </>
  );
};

export default UserComponent;
