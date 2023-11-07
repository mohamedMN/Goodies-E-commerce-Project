import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/DashboardPage.css";
import { useDispatch, useSelector } from "react-redux";
import UserComponent from "../components/userComponent";
import { AiOutlineSearch } from "react-icons/ai";
import ErrorComponent from "../components/ErrorComponent";
import { getUsers } from "../redux/actions/AuthAction";
import AddUserForm from "../components/AddUserForm";

const Users = ({ navVisible }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const testingInfo = useSelector((state) => state.getAllUsers?.Data?.users);

  const [searchValue, setSearchValue] = useState("");
  // const [filteredUsers, setFilteredUsers] = useState([]);

  // Use useEffect to update filteredUsers whenever searchValue changes
  // useEffect(() => {
  //   // Filter the user list based on the searchValue
  //   const result = testingInfo.filter((user) =>
  //     user.user_name.includes(searchValue)
  //   );
  //   setFilteredUsers(result);
  // }, [searchValue]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  return (
    <>
      <div className={navVisible ? "page page-with-navbar" : "page"}>
        <div className="dashboard">
          <div>
            <button
              style={{ color: "Red" }}
              onClick={() => {
                setShowAddUserForm(true);
              }}
            >
              Ajouter User
            </button>
            {showAddUserForm && (
              <AddUserForm onClose={() => setShowAddUserForm(false)} />
            )}
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
            <caption>Users Table for your Back Office</caption>
            <thead className="t-head">
              <tr>
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
              </tr>
            </thead>

            <tbody className="Table-Body">
              {testingInfo && testingInfo.length > 0 ? (
                (() => {
                  const results = testingInfo.filter((user) =>
                    user.user_name.includes(searchValue.toLowerCase())
                  );

                  if (results.length > 0) {
                    return results.map((user, index) => (
                      <UserComponent
                        key={user.id}
                        index={index}
                        managersInfo={user}
                      />
                    ));
                  } else {
                    return <ErrorComponent />;
                  }
                })()
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

Users.propTypes = {
  navVisible: PropTypes.bool.isRequired,
};

export default Users;
