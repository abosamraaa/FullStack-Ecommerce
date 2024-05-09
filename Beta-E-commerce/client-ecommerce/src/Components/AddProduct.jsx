import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddProduct = () => {
  const navigate = useNavigate(); // For navigation after a successful request
  const token = sessionStorage.getItem('jwtToken'); // JWT token for authorization

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productActualPrice, setProductActualPrice] = useState('');
  const [productDiscountedPrice, setProductDiscountedPrice] = useState('');
  const [productImages, setProductImages] = useState([]); // To store the image file

  // Handle image file change
  const handleImageChange = (e) => {
    setProductImages(e.target.files[0]); // Store the selected image file
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(productImages)
    // Ensure all required fields are filled
    if (!productName || !productDescription || !productActualPrice ) {
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
      productName,
      productDescription,
      productActualPrice,
      productDiscountedPrice,
    };

    formData.product = (JSON.stringify(product)); // Send product data as JSON string
    formData.imageFile.push(productImages); // Add the image file to FormData

    // Make the POST request
    fetch('http://localhost:8090/addNewProduct', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Include JWT token for authorization
      },
      body: formData, // Use the FormData object
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
        Swal.fire('Success', 'Product added successfully!', 'success'); // Success message
        navigate('/dashboard'); // Navigate to another page on success
      })
      .catch((error) => {
        Swal.fire('Error', `Error adding product: ${error.message}`, 'error'); // Error message
      });
  };

  return (
    <div className='p-3 addproduct-form'>
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

        {/* Field for product image */}
        <div className="col-md-12">
          <label htmlFor="productImage" className="form-label">Product Image</label>
          <input
            type="file"
            className="form-control"
            id="productImage"
            accept="image/*"
            onChange={handleImageChange} // Handle image change
          />
        </div>

        {/* Buttons for submit and reset */}
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">Add Product</button>
          <button type="reset" className="btn btn-danger">Reset</button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default AddProduct;

