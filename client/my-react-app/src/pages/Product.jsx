function Product(Props) {
  const { navVisible } = Props;

  return (
    <div className={navVisible ? "page page-with-navbar" : "page"}>
      <h1>Product</h1>
    </div>
  );
}

export default Product;
