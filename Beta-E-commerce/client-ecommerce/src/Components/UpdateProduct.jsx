import { useState ,useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
function UpdateProduct(){
    const { productId } = useParams();
    const token = sessionStorage.getItem("jwtToken"); 
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productActualPrice, setProductActualPrice] = useState('');
    const [productDiscountedPrice, setProductDiscountedPrice] = useState('');
    const [product, setProduct] = useState(null);
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
                console.log("Fetched product:", foundProduct);
                console.log("Fetched product:", foundProduct.productName);
                setProductName(foundProduct.productName);
                setProductDescription(foundProduct.productDescription);
                setProductActualPrice(foundProduct.productActualPrice)
                setProductDiscountedPrice(foundProduct.productDiscountedPrice)
                 // Log the fetched product
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
      const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Ensure all required fields are filled
        if (!productName || !productDescription || !productActualPrice) {
          Swal.fire('Error', 'All fields, including an image, are required.', 'error');
          return;
        }
    
        // Create FormData object
        const formData = {
          // productName,
          // productDescription,
          // productActualPrice,
          // productDiscountedPrice,
          // productImages
          product:null,
          imageFile:[]
        };
        const product = {
          productName:productName,
          productDescription:productDescription,
          productActualPrice:productActualPrice,
          productDiscountedPrice:productDiscountedPrice,
        };
    
        formData.product = (JSON.stringify(product)); // Send product data as JSON string
        fetch(`http://localhost:8090/updateProductDetails/${productId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`, // Include JWT token for authorization
          },
          // body: formData, 
          body: JSON.stringify({
            product:{
              productName,
              productDescription,
              productActualPrice,
              productDiscountedPrice
            },
            imageFile:[]
          }),// Use the FormData object
        })
          .then((response) => {
            console.log(formData);
            if (!response.ok) {
              throw new Error(`Failed to add product. Status: ${response.status}`);
            }
    
            return response.json(); 
            // Parse the JSON response
          })
          .then((data) => {
            Swal.fire('Success', 'Product Updated successfully!', 'success'); // Success message
          })
          .catch((error) => {
            Swal.fire('Error', `Error updating product: ${error.message}`, 'error'); // Error message
          });
      };
    return(
        <div className='p-3 addproduct-form container'>
        <form onSubmit={handleFormSubmit}>
    <div className="container row g-3">
      <div className="col-md-12">
        <label htmlFor="productName" className="form-label">Product Name</label>
        <input
          type="text"
          className="form-control"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      <div className="col-md-12">
        <label htmlFor="productDescription" className="form-label">Product Description</label>
        <input
          type="text"
          className="form-control"
          id="productDescription"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
      </div>

      {/* Form fields for product prices */}
      <div className="col-md-4">
        <label htmlFor="productActualPrice" className="form-label">Product Actual Price</label>
        <input
          type="number"
          className="form-control"
          id="productActualPrice"
          value={productActualPrice}
          onChange={(e) => setProductActualPrice(e.target.value)}
        />
      </div>

      {/* Discounted price field */}
      <div className="col-md-4">
        <label htmlFor="productDiscountedPrice" className="form-label">Product Discounted Price</label>
        <input
          type="number"
          className="form-control"
          id="productDiscountedPrice"
          value={productDiscountedPrice}
          onChange={(e) => setProductDiscountedPrice(e.target.value)}
        />
      </div>
      {/* Buttons for submit and reset */}
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success">Update Product</button>
        <button type="reset" className="btn btn-danger">Reset</button>
      </div>
    </div>
  </form>
  </div>
    )
}
export default UpdateProduct;