import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../rtk/slices/product-slice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function ProductsTable() {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("jwtToken");
  const products = useSelector((state) => state.products);

  // Corrected initialization, no inline function in useEffect
  useEffect(() => {
    dispatch(fetchProducts()); // Dispatch action to fetch products
  }, [dispatch]); // Ensure dispatch is a dependency

  const deleteProduct = (productId) => {
    if (!productId) {
      console.error("Cannot delete product: Product ID is undefined");
      return;
    }

    fetch(`http://localhost:8090/deleteProductDetails/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        console.log("Deleted product:", json);
        dispatch(fetchProducts()); // Refresh products after deletion
      })
      .catch((error) => console.error("Delete product error:", error));
  };

  return (
    <>
      <table className="table text-center container">
        <thead className="shadow">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Description</th>
            <th scope="col">Product Actual Price</th>
            <th scope="col">Product Discounted Price</th>
            <th scope="col">Product Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) ? (
            products.map((product) => (
              <tr key={product.productId} className="shadow"> {/* Corrected the key */}
                <th scope="row">{product.productId}</th> {/* Fixed typo */}
                <td>{product.productName}</td>
                <td>{product.productDescription}</td>
                <td>
                  {Array.isArray(product.productImages) && product.productImages.length > 0 ? (
                    <img
                      src={`data:${product.productImages[0].imageType};base64,${product.productImages[0].picByte}`}
                      className="card-img-top custom-card-image" style={{width:"100px"}}
                      alt={product.productName}
                    />
                  ) : (
                    <img
                      src="/path/to/default/image.jpg" // Fallback image
                      className="card-img-top custom-card-image"
                      alt="Default"
                    />
                  )}
                </td>
                <td>{product.productActualPrice}$</td>
                <td>{product.productDiscountedPrice}$</td>
                <td>
                  <Link type="button" className="btn btn-warning" to={`/updateproduct/${product.productId}`}>
                    Update
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteProduct(product.productId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No products available.</td> {/* Use a full-row message */}
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default ProductsTable;
