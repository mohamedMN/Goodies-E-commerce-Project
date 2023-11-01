import React from "react";
import UserComponent from "../components/userComponent";
import "../styles/DashboardPage.css";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const testingInfo = useSelector((state) => JSON.stringify(state.getAllUsers));
  console.log('testingInfo ' + testingInfo)
  return (
    <div className="dashboard">
      {/* {testingInfo.map((user, index) => {
        return <UserComponent managersInfo={user} key={index} />;
      })} */}
    </div>
  );
};

export default Dashboard;
