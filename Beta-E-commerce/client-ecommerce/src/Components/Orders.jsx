import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function Orders(){
    const [products,setProducts] = useState("")
    const [orders,setOrders] = useState("")
    const token = sessionStorage.getItem("jwtToken");
    const getAllOrders = ()=>{
        fetch('http://localhost:8090/getAllOrderDetails/all',{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        })
            .then(res=>res.json())
            .then(json=>{console.log(json)
                setOrders(json)
            })
    }
    useEffect(()=>{
        getAllOrders()
    },[])
    const makeOrderDelivered = async (orderId) => {
        try {
          const response = await fetch(`http://localhost:8090/markOrderAsDelivered/${orderId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (!response.ok) {
            const errorText = await response.text(); // Get detailed error message
            throw new Error(`Failed to mark order as delivered: ${errorText}`);
          }
      
          const data = await response.json();
          console.log("Order marked as delivered:", data);
          getAllOrders(); // Refresh the orders list
        } catch (error) {
          console.error("Error marking order as delivered:", error);
          getAllOrders();
          console.log("Order marked as delivered:", data);
        }
      };
      
    return(
        <>
        <table className="table text-center container mt-5 mb-5">
          <thead className="shadow">
            <tr className="p-3">
              <th scope="col">ID</th>
              <th scope="col">Order Name</th>
              <th scope="col">Order Address</th>
              <th scope="col">Order Contact Number</th>
              <th scope="col">Products</th>
              <th scope="col">Order Price</th>
              <th scope="col">Order Statues</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) ? (
              orders.map((order) => (
                <tr key={order.orderId} className="shadow"> {/* Corrected the key */}
                  <th scope="row">{order.orderId}</th> {/* Fixed typo */}
                  <td>{order.orderFullName}</td>
                  <td>{order.orderFullAddress}</td>
                  <td>{order.orderContactNumber}</td>
                  <td>{order.product.productName}</td>
                  <td>
                    {order.orderAmount} $
                    </td>
                    <td>
                    {order.orderStatues}
                    </td>
                    {(order.orderStatues === "placed")? <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => makeOrderDelivered(order.orderId)}
                    >
                        Make Delivered
                    </button>
                  </td> : <p></p>}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No products available.</td>
              </tr>
            )}
          </tbody>
        </table>

      </>
    )
}
export default Orders;