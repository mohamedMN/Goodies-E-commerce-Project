import { useEffect } from "react";
import { getUsers } from "../actions/AuthAction";
import "../styles/DashboardPage.css";
import { useDispatch, useSelector } from "react-redux";
import UserComponent from "../components/userComponent";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const testingInfo = useSelector((state) => state.getAllUsers?.Data?.users);
  console.log("testingInfo " + testingInfo);
  return (
    <div className="dashboard">
      {testingInfo &&
        testingInfo.map((user, index) => {
          return <UserComponent managersInfo={user} key={index} />;
        })}
    </div>
  );
};

export default Dashboard;
