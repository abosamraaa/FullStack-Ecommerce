import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./Cart.css";

const Cart = () => {
  const token = sessionStorage.getItem("jwtToken"); // Get token from sessionStorage
  const [cart, setCart] = useState([]); // Initialize `cart` as an empty array

  // Function to fetch cart items
  const fetchCartItems = () => {
    fetch("http://localhost:8090/getCartDetails", {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure token is correct
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setCart(json); // Update the cart state with new data
      })
      .catch((error) => {
        console.error("Error fetching cart details:", error);
        Swal.fire(
          "Error",
          `Error fetching cart details: ${error.message}`,
          "error"
        ); // Display error message
      });
  };

  // Fetch cart data on component mount
  useEffect(() => {
    fetchCartItems();
  }, []); // Run once on component mount

  // Delete item from the cart and re-fetch cart data
  const deleteItem = (cartId) => {
    fetch(`http://localhost:8090/deleteCartItem/${cartId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error deleting item: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        console.log(json);
        // Confirmation message
      })
      .catch((error) => {
        fetchCartItems(); // Re-fetch cart data after deletion
        Swal.fire("Success", "Item deleted from cart.", "success"); // Display error message
      });
  };

  return (
    <div className="cardd container mt-3 mb-3">
      <div className="row">
        <div className="col-md-8 cart">
          <div className="title">
            <div className="row">
              <div className="col">
                <h4>
                  <b>Shopping Cart</b>
                </h4>
              </div>
              <div className="col align-self-center text-right text-muted">
                {cart.length} items
              </div>
            </div>
          </div>

          {Array.isArray(cart) && cart.length > 0 ? (
            cart.map((cartItem) => (
              <div
                className="row border-top border-bottom"
                key={cartItem.cartId}
              >
                <div className="row main align-items-center">
                  <div className="col-2">
                    {Array.isArray(cartItem.product.productImages) &&
                    cartItem.product.productImages.length > 0 ? (
                      <img
                        src={`data:${cartItem.product.productImages[0].imageType};base64,${cartItem.product.productImages[0].picByte}`}
                        className="img-fluid"
                        alt="Product"
                      />
                    ) : (
                      <img src="/path/to/default/image.jpg" alt="Default" />
                    )}
                  </div>
                  <div className="col">
                    <div className="row text-muted">
                      {cartItem.product.productName}
                    </div>
                    <div className="row">
                      {cartItem.product.productDescription}
                    </div>
                  </div>
                  <div className="col">
                    {/* Quantity controls */}
                    <a href="#">-</a>
                    <a href="#" className="border">
                      {cartItem.quantity || 1}
                    </a>
                    <a href="#">+</a>
                  </div>
                  <div className="col">
                    &euro;{" "}
                    {cartItem.product.productActualPrice -
                      cartItem.product.productDiscountedPrice}
                  </div>
                  <div className="col text-right">
                    <button
                      className="btn"
                      style={{ background: "red", color: "white" }}
                      onClick={() => deleteItem(cartItem.cartId)}
                    >
                      Delete Item
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No items in the cart.</div> // If cart is empty
          )}

          {/* Link back to the shop */}
          <div className="back-to-shop mt-3">
            <Link to="/">&larr; Back to Shop</Link>
          </div>
        </div>

        {/* Summary section */}
        <div className="col-md-4 summary">
          <div>
            <h5>
              <b>Summary</b>
            </h5>
          </div>
          <hr />
          <div className="row">
            <div className="col">ITEMS {cart.length}</div>
            <div className="col text-right">
              &euro;{" "}
              {cart
                .reduce(
                  (sum, item) => sum + (item.product?.productActualPrice || 0),
                  0
                )
                .toFixed(2)}
            </div>
          </div>
          <form>
            <p>SHIPPING</p>
            <select>
              <option className="text-muted">
                Standard Delivery - &euro;5.00
              </option>
            </select>
            <p>GIVE CODE</p>
            <input id="code" placeholder="Enter your code" />
          </form>
          <div
            className="row"
            style={{
              borderTop: "1px solid rgba(0, 0, 0, .1)",
              padding: "2vh 0",
            }}
          >
            <div className="col">TOTAL PRICE</div>
            <div className="col text-right">
              &euro;{" "}
              {cart
                .reduce(
                  (sum, item) => sum + (item.product?.productActualPrice || 0),
                  0
                )
                .toFixed(2) + 5}
            </div>
          </div>
          <Link className="btn" to={"/checkout"}>
            CHECKOUT
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
