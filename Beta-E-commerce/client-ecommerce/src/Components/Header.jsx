import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserContext";
// import LogoProject from "D:/SW_Project_springboot/Beta-E-commerce/client-ecommerce/public/Images/beta.png";
// import Profile from "D:/SW_Project_springboot/Beta-E-commerce/client-ecommerce/public/Images/user.png";
// import Cart from "D:/SW_Project_springboot/Beta-E-commerce/client-ecommerce/public/Images/shopping-cart.png";
// import LogOut from "D:/SW_Project_springboot/Beta-E-commerce/client-ecommerce/public/Images/turn-off.png";

function Header() {
  const navigate = useNavigate();
  const userRole = sessionStorage.getItem("role");
  const [cart, setCart] = useState([]);
  const isAdmin = userRole && userRole.toLowerCase() === "admin";
  const token = sessionStorage.getItem("jwtToken"); // Retrieve JWT token
  const itemsAdded = useSelector((state) => state.cart); // Retrieve items from Redux
  useEffect(() => {
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
        setCart(json); // Set the cart data
      })
      .catch((error) => {
        console.error("Error fetching cart details:", error); // Error handling with alert
      });
  }, []); // Run this effect only once on component mount
  const handleLogout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("role");
    // Clear JWT token
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="login-header p-3">
      <div className="logo-header d-flex">
        {/* <img src={LogoProject} alt="Logo" /> */}
        <h2>BETA</h2>
      </div>
      <nav className="login-header-nav">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/about" className="link">
          About
        </Link>
        <Link to="/contact" className="link">
          Contact
        </Link>
      </nav>

      {token ? (
        <div className="show-items-loggedIn">
          {!isAdmin && ( // Show cart only if user is not an admin
            <Link to="/cart">
              <p>cart</p>
              <span>{cart?.length || 0}</span>{" "}
              {/* Ensure itemsAdded is defined */}
            </Link>
          )}
          <Link to="/profile">
            <p>profile</p>
          </Link>
          <p onClick={handleLogout}>Logout</p>
          {/* Ensure correct logout */}
        </div>
      ) : (
        <div className="header-buttons">
          <Link
            type="button"
            className="btn btn-outline-secondary link p-3"
            to="/login"
            style={{ backgroundColor: "#1c2331", border: "#1c2331" }}
          >
            SIGN IN
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
