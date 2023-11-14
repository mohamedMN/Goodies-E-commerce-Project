const OrderItem = (Props) => {
  const { options } = Props;
  return (
    <div className="order-item p-4 ">
      <div className="flex justify-between mb-2">
        <p className="product-name">{options.name}</p>
        <p className="product-price text-green-500">+{options.price}$</p>
      </div>
      <div className="flex justify-between mb-2">
        <p>{options.category}</p>
        Items: {options.quantity}
      </div>
      Size: {options.size}
    </div>
  );
};

export default OrderItem;
