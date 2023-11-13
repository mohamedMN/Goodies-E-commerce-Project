import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/DashboardPage.css";
import { AiOutlineSearch } from "react-icons/ai";
import AddUserForm from "../components/AddUserForm";
import TableContainer from "../containers/TableContainer";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import UpdateUser from "../components/UpdateUser";
import { getUsers } from "../redux/actions/AuthAction";
const Users = ({ navVisible }) => {
  const [searchValue, setSearchValue] = useState("");

  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
  // Update user if he click on it or not
  const id_user = useSelector((state) => state.UpdateUserReducer?.id);
  // console.log("id_user " + id_user);
  const dispatch = useDispatch();

  const testingInfo = useSelector((state) => state.getAllUsers?.Data?.users);
  useEffect(() => {
    dispatch(getUsers());
  }, [testingInfo, dispatch]);

  useEffect(() => {
    if (id_user) {
      setShowUpdateUserForm(true);
    }
  }, [id_user]);

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
              <span className="self-end text-lg text-primary">
                {testingInfo ? testingInfo.length : 0}
              </span>
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
              {showUpdateUserForm && (
                <UpdateUser
                  id={id_user}
                  onClose={() => setShowUpdateUserForm(false)}
                  onClick={() => {
                    setShowUpdateUserForm(true);
                    console.log("id_user " + id_user);
                  }}
                />
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
