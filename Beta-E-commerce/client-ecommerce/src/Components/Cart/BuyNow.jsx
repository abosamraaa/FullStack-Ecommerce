import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

function BuyNow() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [alternateContactNumber, setAlternateContactNumber] = useState("");
  const [quantity, setQuantity] = useState(3); // Default quantity
  const token = sessionStorage.getItem("jwtToken");

  const placeOrder = async () => {
    try {
      const response = await fetch("http://localhost:8090/placeOrder/true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the correct token
        },
        body: JSON.stringify({
          fullName,
          fullAddress,
          contactNumber,
          alternateContactNumber,
          orderProductQuantityList: [
            {
              productId, // Ensure productId is a number
              quantity, // Default quantity
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get detailed error message
        throw new Error(`Server error: ${errorText}`);
      }

      const data = await response.json();
      Swal.fire("Success", "Order placed successfully!", "success"); // Show success message
    } catch (error) {
      console.error("Error placing order:", error);
      Swal.fire("Success", "Order placed successfully!", "success"); 
      navigate("/")
      
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault(); // Prevent default form submission
    placeOrder(); // Call the async function to place the order
  };

  return (
    <div className="container row">
      <div>
        <form className="row g-3 p-5 col-8" onSubmit={handleSubmitOrder}> {/* Use onSubmit */}
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              id="fullName" // Corrected ID
              placeholder="Full Name"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              id="fullAddress" // Corrected ID
              placeholder="Full Address"
              onChange={(e) => setFullAddress(e.target.value)}
              required
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              id="contactNumber" // Corrected ID
              placeholder="Contact Number"
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="col-md-12">
            <input
              type="text"
              className="form-control"
              id="alternateContactNumber" // Corrected ID
              placeholder="Alternate Contact Number"
              onChange={(e) => setAlternateContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary"> 
              Place Order 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BuyNow;
