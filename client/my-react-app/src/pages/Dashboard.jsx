import React from "react";
import UserComponent from "../components/userComponent";
import "../styles/DashboardPage.css";

const Dashboard = () => {
  const testingInfo = [
    {
      username: "sm1",
      email: "ww1@gmail.com",
      role: "Admin",
      lastName: "awili",
    },
    {
      username: "sm1",
      email: "ww1@gmail.com",
      role: "Admin",
      lastName: "awili",
    },
    {
      username: "sm1",
      email: "ww1@gmail.com",
      role: "Admin",
      lastName: "awili",
    },
    {
      username: "sm1",
      email: "ww1@gmail.com",
      role: "Admin",
      lastName: "awili",
    },
  ];

  return (
    <div className="dashboard">
      {testingInfo.map((user, index) => {
        return <UserComponent managersInfo={user} key={index} />;
      })}
    </div>
  );
};

export default Dashboard;
