import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/DashboardPage.css";
import { AiOutlineSearch } from "react-icons/ai";
import AddUserForm from "../components/AddUserForm";
import TableContainer from "../containers/TableContainer";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Await } from "react-router-dom";

const Users = ({ navVisible }) => {
  const [searchValue, setSearchValue] = useState("");
  // const [filteredUsers, setFilteredUsers] = useState([]);

  // Use useEffect to update filteredUsers whenever searchValue changes
  // useEffect(() => {
  // Filter the user list based on the searchValue
  //   const result = testingInfo.filter((user) =>
  //     user.user_name.includes(searchValue)
  //   );
  //   setFilteredUsers(result);
  // }, [searchValue]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const testingInfo = useSelector((state) => state.getAllUsers?.Data?.users);

  return (
    <>
      <div className={navVisible ? "page page-with-navbar" : "page"}>
            <form className="flex form-search-user">
              <input
                className="searchUserInput bg-transparent"
                placeholder="  Search By Username"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <AiOutlineSearch className="search-icon" />
            </form>
        <div className="dashboard">
          <div className="Header-Container">
          <h1 className="headerTitle">USERS</h1>

            <button
              className="btn"
              onClick={() => {
                setShowAddUserForm(!showAddUserForm);
              }}
            >
              Add User
            </button>
            <label className="flex flex-col">
            <h1 className="text-center">Total Users :</h1>
            <span className="self-end text-lg text-primary">{testingInfo.length}</span>
            </label>
            <motion.div
              whileTap={{ scale: 0.98 }}
              dragConstraints={{ left: 500, right: 500, bottom: 20, top: 0 }}
              className="Create-User-Form"
              drag
            >
              {showAddUserForm && (
                <AddUserForm onClose={() => setShowAddUserForm(false)} />
              )}
            </motion.div>
          </div>
          <div className="Table-Container h-3/5 overflow-x-auto">
            <TableContainer searchValue={searchValue} />
          </div>
        </div>
      </div>
    </>

  );
};

Users.propTypes = {
  navVisible: PropTypes.bool.isRequired,
};

export default Users;
