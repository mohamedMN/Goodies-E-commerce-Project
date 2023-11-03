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
  // handle Recherche of USER
  const [searchValue, setSearchValue] = useState("");
  const testingInfo = useSelector((state) => state.getAllUsers?.Data?.users);

  const handleRecherche = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={navVisible ? "page page-with-navbar" : "page"}>
        <div className="dashboard">
          <div>
            <form onClick={handleRecherche}>
              <label style={{ color: "white" }}>Recherche user </label>
              <input
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
          </div>
          {testingInfo &&
            testingInfo.map((user) => (
              <UserComponent key={user.id} managersInfo={user} /> // Use a unique identifier for the key
            ))}
        </div>
      </div>
    </>
  );
};

Dashboard.propTypes = {
  navVisible: PropTypes.bool.isRequired, // Define PropTypes
};

export default Dashboard;
