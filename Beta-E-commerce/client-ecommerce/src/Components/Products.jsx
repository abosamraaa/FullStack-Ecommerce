import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../rtk/slices/product-slice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  console.log(products)
  useEffect(() => {
    dispatch(fetchProducts());

  }, [dispatch]);

  return (
    <div className="row gap-5 pt-3 pb-3">
      {Array.isArray(products) ? (
        products.map((product) => (
  
          <div className="card p-3 product-card" style={{ width: '18rem' }} key={product.productId}>
            {Array.isArray(product.productImages) && product.productImages.length > 0 ? (
              <img
                src={`data:${product.productImages[0].imageType};base64,${product.productImages[0].picByte}`} // Correct image source
                className="card-img-top custom-card-image"
                alt={product.productName}
              />
            ) : (
              <img
                src="/path/to/default/image.jpg" // Fallback image
                className="card-img-top custom-card-image"
                alt="Default"
              />
            )}
            <div className="card-body text-center">
              <h5 className="card-title">{product.productName}</h5>
              <p className="card-text">{product.productActualPrice - product.productDiscountedPrice}$</p>
              <div className="d-flex justify-content-between">
              <span className="card-text actual-price">{product.productActualPrice}$</span>
              <span className="card-text">{Math.round(((product.productActualPrice - product.productDiscountedPrice) / product.productActualPrice) * 10)}%</span>
              </div>
              <Link className="btn btn-primary" style={{background:"#6351ce",border:"#6351ce"}} to={`/product/${product.productId}`}>
                View Product
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No products available.</p> // Ensure proper fallback
      )}
    </div>
  );
}

export default Products;


