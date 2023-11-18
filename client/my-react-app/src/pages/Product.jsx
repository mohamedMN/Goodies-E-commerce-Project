import { useState, useEffect } from "react";
import axios from "axios";
import { green, red, yellow } from "@mui/material/colors";

function Product(Props) {
  const { navVisible } = Props;
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: 10, quantity: 5 },
    { id: 2, name: "Product 2", price: 15, quantity: 8 },
    { id: 3, name: "Product 3", price: 20, quantity: 12 },
    // Add more sample data as needed
  ]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("/api/products");
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error("Error fetching product data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleInputChange = (event, index, attribute) => {
    const updatedProducts = [...products];
    updatedProducts[index][attribute] = event.target.value;
    setProducts(updatedProducts);
  };

  const handleUpdateProduct = async (index) => {
    try {
      const response = await axios.put(
        `/api/products/${products[index].id}`,
        products[index]
      );

      if (response.status === 200) {
        console.log("Product updated successfully");
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <div className={navVisible ? "page page-with-navbar" : "page"}>
        <h1>Product</h1>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>
                <input
                  type="number"
                  value={product.price}
                  onChange={(event) => handleInputChange(event, index, "price")}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(event) =>
                    handleInputChange(event, index, "quantity")
                  }
                />
              </td>
              <td>
                <button
                  style={{ color: green }}
                  onClick={() => handleUpdateProduct(index)}
                >
                  Add
                </button>
                <button
                  style={{ color: yellow }}
                  onClick={() => handleUpdateProduct(index)}
                >
                  Update
                </button>
                <button
                  style={{ color: red }}
                  onClick={() => handleUpdateProduct(index)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Product;
