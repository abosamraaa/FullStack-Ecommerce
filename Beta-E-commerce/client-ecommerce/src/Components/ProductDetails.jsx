import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../rtk/slices/cart-slice"; // Redux action to add product to cart
import { Link ,useNavigate } from "react-router-dom";
function ProductDetails() {
  const { productId } = useParams(); // Get productId from route parameters
  const token = sessionStorage.getItem("jwtToken"); // Get token from sessionStorage
  const [product, setProduct] = useState(null); // Product state (initialized as null)
  const dispatch = useDispatch(); // Get Redux dispatch function
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const getStoredIds = () => {
    const storedIds = sessionStorage.getItem("ids");
    return storedIds ? JSON.parse(storedIds) : [];
  };
  useEffect(() => {
    if (productId && token) {
      fetch(`http://localhost:8090/getProductDetails/true/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include authorization token
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Failed to fetch product details. Status: ${res.status}`);
          }
          return res.json(); // Parse the response as JSON
        })
        .then((json) => {
          // Find the product with the specified productId
          const foundProduct = json.find((item) => item.productId === parseInt(productId));
          if (foundProduct) {
            setProduct(foundProduct); // Set the product state with the correct item
            console.log("Fetched product:", foundProduct); // Log the fetched product
          } else {
            console.error("Product not found");
            setProduct(null); // Reset state if product not found
          }
        })
        .catch((err) => console.error("Error fetching product details:", err)); // Handle errors
    }
  }, [productId, token]); // Re-run effect when productId or token changes

  if (!product) {
    return <div>Loading...</div>; // Display loading while fetching data
  }
  const addToCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8090/addToCart/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      Swal.fire('Success', 'product is added successfully', 'success');
      navigate("/cart");
      const storedIds = getStoredIds(); // Get the existing list of IDs
      if (!storedIds.includes(productId)) {
        storedIds.push(productId); // Add the new product ID to the array
      }
      sessionStorage.setItem("ids", JSON.stringify(storedIds));
    } catch (err) {
      console.error('Error creating user:', err);
      setError(err.message);
      Swal.fire('Error', `Failed to register: ${err.message}`, 'error'); // Display error message
    }
  };

  return (
    <>
    {/* <div className="card p-3" style={{ width: "18rem" }}>
      {Array.isArray(product.productImages) && product.productImages.length > 0 ? (
        <img
          src={`data:${product.productImages[0].imageType};base64,${product.productImages[0].picByte}`}
          className="card-img-top"
          alt={product.productName}
        />
      ) : (
        <img
          src="/path/to/default/image.jpg"
          className="card-img-top"
          alt="Default"
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{product.productName}</h5>
        <p className="card-text">
          Actual Price: {product.productActualPrice} 
          {product.productDiscountedPrice ? ` (Discounted: ${product.productDiscountedPrice})` : ""}
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            addToCart(product.productId) // Add product to Redux cart
          }}
        >
          Add to Cart
        </button>
        <Link className="btn btn-primary" style={{background:"#6351ce",border:"#6351ce"}} to={`/buynow/${product.productId}/${product.productName}`}>
                Buy Now
              </Link>
      </div>
    </div> */}
         <section className="py-5">
     <div className="container px-4 px-lg-5 my-5 productCard">
       <div className="row gx-4 gx-lg-5 align-items-center">
         <div className="col-md-6">
           {/* <img
             className="card-img-top mb-5 mb-md-0"
             src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg"
             alt="Product Image"
           /> */}
                 {Array.isArray(product.productImages) && product.productImages.length > 0 ? (
        <img
          src={`data:${product.productImages[0].imageType};base64,${product.productImages[0].picByte} `}
          className="card-img-top mb-5 mb-md-0"
          style={{width:"300px"}}
          alt={product.productName}
        />
      ) : (
        <img
          src="/path/to/default/image.jpg"
          className="card-img-top mb-5 mb-md-0"
          alt="Default"
        />
      )}
         </div>
         <div className="col-md-6">
           <div className="small mb-1">SKU: BST-498</div>
           <h1 className="display-5 fw-bolder">{product.productName}</h1>
           <div className="fs-5 mb-5 d-flex gap-2">
             <span className="text-decoration-line-through">{product.productActualPrice}</span>
             <span>{product.productActualPrice - product.productDiscountedPrice} $</span>
           </div>
           <p className="lead">
            {product.productDescription}
           </p>
           <input
               className="form-control text-center me-3"
               id="inputQuantity"
               type="number"
               min="1"
               style={{ maxWidth: '3rem' }}
             />
           <div className="d-flex">
             <button
               className="btn btn-outline-dark flex-shrink-0"
               type="button"
               onClick={() => {
                addToCart(product.productId)
                if (!ids.includes(productId)) {
                  ids.push(productId); // Add the new product ID to the array
                }
              
                // Store the updated array back in sessionStorage
                sessionStorage.setItem("ids", JSON.stringify(ids));
                 // Add product to Redux cart
              }}
             >
               <i className="bi-cart-fill me-1"></i>
               Add to cart
             </button>

           </div>
           <Link className="btn btn-primary" style={{background:"#6351ce",border:"#6351ce"}} to={`/buynow/${product.productId}/${product.productName}`}>
                Buy Now
              </Link>
         </div>
       </div>
     </div>
   </section>

   </>
  );
}

export default ProductDetails; // Export the component

