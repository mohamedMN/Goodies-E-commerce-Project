const Analytics = (Props) => {
  const { navVisible } = Props;

  return (
    <div className={navVisible ? "page page-with-navbar" : "page"}>
      <h1>Analytics</h1>
    </div>
  );
};

export default Analytics;
