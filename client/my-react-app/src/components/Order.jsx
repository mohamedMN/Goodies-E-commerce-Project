import OrderItem from "../pages/OrderList";

const Order = (Props) => {
  const { navVisible } = Props;
  const latestOrders = [
    {
      name: "order1",
      price: 200,
      category: "men shoes",
      quantity: 20,
      size: "L",
    },
    {
      name: "order2",
      price: 200,
      category: "men shoes",
      quantity: 20,
      size: "L",
    },
    {
      name: "order3",
      price: 200,
      category: "men shoes",
      quantity: 20,
      size: "L",
    },
  ];
  // Calculate the total amount
  const totalAmount = latestOrders.reduce(
    (total, order) => total + order.price,
    0
  );

  return (
    <div className={navVisible ? "page page-with-navbar" : "page"}>
      <div className="flex justify-center items-center h-screen right-0">
        <div className="latest-orders-container bg-background-color p-8 text-text-color rounded-lg shadow-lg w-96">
          <h2 className="font-bold latest-orders-title text-3xl">
            Latest Orders:
          </h2>
          <div className="flex flex-col items-center">
            <p className="amount-title text-xl">Amount:</p>
            <p className="amount-value text-white text-xl">${totalAmount}</p>
          </div>
          <div className="order-items mt-4">
            {latestOrders.map((order, index) => {
              return <OrderItem options={order} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
