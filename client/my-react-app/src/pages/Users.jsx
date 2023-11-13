import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/DashboardPage.css";
import { AiOutlineSearch } from "react-icons/ai";
import AddUserForm from "../components/AddUserForm";
import TableContainer from "../containers/TableContainer";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import UpdateUser from "../components/UpdateUser";
const Users = ({ navVisible }) => {
  const [searchValue, setSearchValue] = useState("");

  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
  // Update user if he click on it or not
  const id_user = useSelector((state) => state.UpdateUserReducer?.id);
  // console.log("id_user " + id_user);

  useEffect(() => {
    if (id_user) {
      setShowUpdateUserForm(true);
    }
  }, [id_user]);

  return (
    <>
      <div className={navVisible ? "page page-with-navbar" : "page"}>
        <div className="dashboard">
          <div className="Header-Container">
            <button
              className="btn"
              onClick={() => {
                setShowAddUserForm(!showAddUserForm);
              }}
            >
              Add User
            </button>
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
