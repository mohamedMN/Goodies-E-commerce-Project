import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/DashboardPage.css";
import { useSelector } from "react-redux";
import UserComponent from "../components/userComponent";
import { AiOutlineSearch } from "react-icons/ai";
import ErrorComponent from "../components/ErrorComponent";

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
            <form className="flex form-search-user">
              <input
              className="searchUserInput bg-transparent"
              placeholder="  Search"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <AiOutlineSearch className="search-icon" />
            </form>
          </div>
          <table className="Main-table">
          <caption>
            Users Table for your Back Office
          </caption>
          <thead className="t-head">
              <th className="table-Header" scope="col">
                <label>Username</label>
              </th>
              <th className="table-Header" scope="col">
                <label>Id</label>
              </th>
              <th className="table-Header" scope="col">
                <label>Role</label>
              </th>
              <th className="table-Header" scope="col">
                <label>Email</label>
              </th>
              <th className="table-Header" scope="col">
                <label>Actions</label>
              </th>
          </thead>
          
          <tbody className="Table-Body">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <UserComponent key={user.id} index={index} managersInfo={user} />
                    ))
                  ) : (
                   <ErrorComponent />
                     )}
</tbody>

          </table>
        </div>
      </div>
    </>
  );
};

Dashboard.propTypes = {
  navVisible: PropTypes.bool.isRequired,
};

export default Dashboard;
