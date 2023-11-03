import { useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { getUsers } from "../redux/actions/AuthAction";
import "../styles/DashboardPage.css";
import { useDispatch, useSelector } from "react-redux";
import UserComponent from "../components/userComponent";

const Dashboard = ({ navVisible }) => {
  // Destructure props
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]); // Add dispatch as a dependency

  const testingInfo = useSelector((state) => state.getAllUsers?.Data?.users);

  return (
    <div className={navVisible ? "page page-with-navbar" : "page"}>
      <div className="dashboard">
        {testingInfo &&
          testingInfo.map((user) => (
            <UserComponent key={user.id} managersInfo={user} /> // Use a unique identifier for the key
          ))}
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  navVisible: PropTypes.bool.isRequired, // Define PropTypes
};

export default Dashboard;
