import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/DashboardPage.css";
import AddUserForm from "../components/AddUserForm";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import UpdateUser from "../components/UpdateUser";
import { getUsers } from "../redux/actions/AuthAction";
import Header from "../components/Header";
import UsersTableContainer from "../containers/UsersTableContainer";
const UsersPage = ({ navVisible }) => {
  // const [searchValue, setSearchValue] = useState("");

  const auth = useSelector((state) => state.authReducer?.authData); // user
  const searchValue = useSelector((state) => state.searchReducer?.search); // user

  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
  // Update user if he click on it or not
  const id_user = useSelector((state) => state.UpdateUserReducer?.id);
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
      <div
        className={
          navVisible
            ? "page page-with-navbar flex flex-col justify-around"
            : "page flex flex-col justify-around"
        }
      >
        <Header />

        <div className="w-5/6 h-3/4 bg-primary rounded-2xl px-2 py-10 flex flex-col items-center text-secondary">
          <div className="flex justify-around w-full">
            <h1 className="font-roboto text-center z-10 text-md 2xl:text-3xl xl:text-2xl lg:text-xl md:text-xl sm:text-lg">
              Users:
            </h1>
            {auth.user.role === "Admin" ? (
              <button
                className="btn btn-primary btn-outline normal-case text-xs btn-xs sm:text-xs sm:btn-xs md:text-sm md:btn-sm lg:text-sm lg:btn-md xl:text-sm xl:btn-md "
                onClick={() => {
                  setShowAddUserForm(!showAddUserForm);
                }}
              >
                Add User
              </button>
            ) : null}

            <label className="flex flex-col">
              <h1 className="font-roboto text-center z-10 text-md 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl sm:text-lg">
                Total Users :
              </h1>
              <span className="self-end font-roboto text-center 2xl:text-2xl xl:text-xl lg:text-lg md:text-md sm:text-sm text-neutral font-semibold">
                {testingInfo ? testingInfo.length : 0}
              </span>
            </label>
            <motion.div
              whileTap={{ scale: 0.98 }}
              dragElastic={{ top: 0, bottom: 0.3 }}
              className={
                showAddUserForm
                  ? "bg-primary absolute z-50 w-fit h-2/3 p-3 justify-center items rounded-xl flex"
                  : "hidden"
              }
              drag
            >
              {showAddUserForm && (
                <AddUserForm onClose={() => setShowAddUserForm(false)} />
              )}
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.98 }}
              dragElastic={{ top: 0, bottom: 0.3 }}
              className={
                showUpdateUserForm
                  ? "bg-primary absolute z-50 w-fit h-2/3 p-3 justify-center items rounded-xl flex"
                  : "hidden"
              }
              drag
            >
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
          <div className="w-full self-center justify-self-start  overflow-x-auto">
            <UsersTableContainer searchValue={searchValue} />
          </div>
        </div>
      </div>
    </>
  );
};

UsersPage.propTypes = {
  navVisible: PropTypes.bool.isRequired,
};

export default UsersPage;
