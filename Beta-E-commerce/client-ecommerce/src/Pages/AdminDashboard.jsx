// import products from "D:SW_Project_springbootBeta-E-commerceclient-ecommercepublicImages/beta.png/product.png";
// import order from "D:SW_Project_springbootBeta-E-commerceclient-ecommercepublicImages/beta.png/clipboard.png";
import { Link, Routes, Route } from "react-router-dom";
import AddProduct from "../Components/AddProduct";
import ProductsTable from "../Components/ProductsTable";
import Orders from "../Components/Orders";

function AdminDashboard() {
  return (
    <div className="d-flex">
      <div className="aside-dashboard">
        <Link to="/dashboard/addProduct" className="menu-button link">
          {/* <img src={products} alt="" className="admindash-header-logo" /> */}
          <p>Add Product</p>
        </Link>
        <Link to="/dashboard/products" className="menu-button link">
          {/* <img src={products} alt="" className="admindash-header-logo" /> */}
          <p>Products</p>
        </Link>
        <Link to="/dashboard/orders" className="menu-button link">
          {/* <img src={order} alt="" className="admindash-header-logo" /> */}
          <p>Orders</p>
        </Link>
      </div>
      <Routes>
        <Route path="addProduct" element={<AddProduct />} />
        <Route path="products" element={<ProductsTable />} />
        <Route path="orders" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default AdminDashboard;
