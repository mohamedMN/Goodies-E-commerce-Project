import {
  AiOutlineDelete,
  AiOutlineEllipsis,
  AiOutlineUserAdd,
} from "react-icons/ai";

const UserComponent = (Props) => {
  const { managersInfo } = Props;
  return (
    <div className="manager-Container">
      <div className="manager-Info">
        {/* <label>Username: {managersInfo.user_name}</label> */}
        <label>{managersInfo._id}</label>
        {/* <label>{managersInfo.email}</label> */}
        <label>{managersInfo.role}</label>
        {/* <label>{managersInfo.last_name}</label>
        <label>{managersInfo.first_name}</label>*/}
        <label>{managersInfo.user_name}</label>
      </div>
      <div className="manager-Options">
        <button onClick={() => {}}>
          <AiOutlineDelete />
        </button>
        <button onClick={() => {}}>
          <AiOutlineUserAdd />
        </button>{" "}
        <button onClick={() => {}}>
          <AiOutlineEllipsis />
        </button>
      </div>
    </div>
  );
};

export default UserComponent;
