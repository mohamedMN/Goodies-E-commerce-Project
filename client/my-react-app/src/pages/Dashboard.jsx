import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/DashboardPage.css";
import { useSelector } from "react-redux";
import UserComponent from "../components/userComponent";

const Dashboard = ({ navVisible }) => {
  const testingInfo = useSelector((state) => state.getAllUsers?.Data?.users);

  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Use useEffect to update filteredUsers whenever searchValue changes
  useEffect(() => {
    // Filter the user list based on the searchValue
    const result = testingInfo.filter((user) =>
      user.user_name.includes(searchValue)
    );
    setFilteredUsers(result);
  }, [searchValue, testingInfo]);

  return (
    <>
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
          {filteredUsers.length > 0
            ? filteredUsers.map((user) => (
                <UserComponent key={user.id} managersInfo={user} />
              ))
            : testingInfo.map((user) => (
                <UserComponent key={user.id} managersInfo={user} />
              ))}
        </div>
      </div>
    </>
  );
};

Dashboard.propTypes = {
  navVisible: PropTypes.bool.isRequired,
};

export default Dashboard;
