import { useState } from "react";

const Dashboard = () => {
  const whiteText = { color: "white" }; // Define a style object for white text

  return (
    <div className="dashboard">
      <h1 style={whiteText}>Dashboard</h1>
      <p style={whiteText}>Total Users: </p>
      <p style={whiteText}>Active Users: </p>
      <p style={whiteText}>Inactive Users: </p>
    </div>
  );
};

export default Dashboard;
