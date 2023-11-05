import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/DashboardPage.css";
import { useDispatch, useSelector } from "react-redux";
import UserComponent from "../components/userComponent";
import { getUsers } from "../redux/actions/AuthAction";

const AllUsers = ({ navVisible }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const testingInfo = useSelector((state) => state.getAllUsers?.Data?.users);

  const [searchValue, setSearchValue] = useState("");


  return (
    <div className={navVisible ? "page page-with-navbar" : "page"}>
      <div className="dashboard">
        <div>
          <form>
            <label style={{ color: "white" }}>Recherche user</label>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
        </div>
        <button style={{ color: "Red" }}>Ajouter USer</button>

        {testingInfo && testingInfo.length > 0 ? (
          testingInfo
            .filter((user) =>
              user.user_name.includes(searchValue.toLowerCase())
            )
            .map((user) => {
              return <UserComponent key={user.id} managersInfo={user} />;
            })
        ) : (
          <p>No users available.</p>
        )}
      </div>
    </div>
  );
};

AllUsers.propTypes = {
  navVisible: PropTypes.bool.isRequired,
};

export default AllUsers;
