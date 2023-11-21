import {
  AiOutlineDelete,
  AiOutlineEllipsis,
} from "react-icons/ai";
import { FaRegCopy } from "react-icons/fa6";
import { axiosPrivateUser } from "../services/api";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { UpdateUser } from "../redux/actions/AuthAction";
// import { useSelector } from "react-redux";
const UserComponent = (Props) => {
  const { managersInfo, isAdmin } = Props;
  // const user = useSelector((state) => state.authReducer?.authData);
  // const [showManagerAlert, setShowManagerAlert] = useState(false);

  const dispatch = useDispatch();

  const handleUserDelete = (id) => {
    axiosPrivateUser
      .delete(`/${id}`)
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
      icon: "question",
      background: "#232527",
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
  const truncatedId =(id)=> id.substring(0, 5) + '...';
  const handleCopyClick =async (textToCopy) => {
    await navigator.clipboard.writeText(textToCopy);
    alert('Text copied to clipboard!');
    console.log(textToCopy)
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
        <th className="text-center justify-center items-center table-cell">
          <label>
            <input type="checkbox"  className="checkbox border-secondary checkbox-secondary checkbox-sm" />
          </label>
        </th>
        <td className="text-neutral justify-start items-center" scope="row">
          <label className="text-neutral">{managersInfo.user_name}</label>
        </td>
        <td className="text-neutral justify-around items-center">
          <label>{truncatedId(managersInfo._id)}</label>
          <button onClick={()=> handleCopyClick(managersInfo._id)}><FaRegCopy size={15} /></button>
        </td>
        <td className="text-neutral justify-start items-center" scope="row">
          <label>{managersInfo.role}</label>
        </td>
        <td className="text-neutral  justify-start items-center" scope="row">
          <label>{managersInfo.email}</label>
        </td>
        {isAdmin && (
          <td className="text-neutral flex items-center justify-between" scope="col">
            <button
              onClick={() =>
                showDeleteSwal(managersInfo._id, managersInfo.user_name)
              }
            >
              {managersInfo.role !== "Admin" ? <AiOutlineDelete size={18} /> : null}
            </button>
            <button
              onClick={() => {
                handleUserUpdate(managersInfo._id);
              }}
            >
              <AiOutlineEllipsis size={18} />
            </button>
          </td>
        )}
      </tr>
    </>
  );
};

export default UserComponent;
