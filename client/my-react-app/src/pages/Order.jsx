const Order = (Props) => {
  const { navVisible } = Props;

  return (
    <div className={navVisible ? "page page-with-navbar" : "page"}>
      <h1>Orders</h1>
    </div>
  );
};

export default Order;
