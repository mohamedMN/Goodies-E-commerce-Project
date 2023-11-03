const User = (Props) => {
  const { navVisible } = Props;

  return (
    <div className={navVisible ? "page page-with-navbar" : "page"}>
      <h1>User</h1>
    </div>
  );
};

export default User;
