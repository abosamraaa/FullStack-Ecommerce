package com.ecommerce.service;

import com.ecommerce.configuration.JwtRequestFilter;
import com.ecommerce.dao.CartDao;
import com.ecommerce.dao.OrderDetailDao;
import com.ecommerce.dao.ProductDao;
import com.ecommerce.dao.UserDao;
import com.ecommerce.entity.*;
import com.ecommerce.models.OrderInput;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailService {
    private static String ORDER_PLACED = "placed";
    private OrderDetailDao orderDetailDao;
    private ProductDao productDao;
    private UserDao userDao;
    private CartDao cartDao;

    public OrderDetailService(OrderDetailDao orderDetailDao, ProductDao productDao, UserDao userDao, CartDao cartDao) {
        this.orderDetailDao = orderDetailDao;
        this.productDao = productDao;
        this.userDao = userDao;
        this.cartDao = cartDao;
    }


    public List<OrderDetail> getOrderDetails(){
        String currentUser=JwtRequestFilter.CURRENT_USER;
        LocalUser user =userDao.findById(currentUser).get();
        return orderDetailDao.findByUser(user);
    }

    public List<OrderDetail> getAllOrderDetails(String status){
        List<OrderDetail> orderDetails =new ArrayList<>();
        if(status.equals("all")) {
            orderDetailDao.findAll().forEach(
                    x -> orderDetails.add(x)
            );
        }
        else {
            orderDetailDao.findByOrderStatues(status).forEach(
                    x -> orderDetails.add(x)
            );
        }
        return orderDetails;
    }


    public void markOrderAsDelivered(Integer orderId){
        OrderDetail orderDetail= orderDetailDao.findById(orderId).get();
        if(orderDetail!= null){
            orderDetail.setOrderStatues("Delivered");
            orderDetailDao.save(orderDetail);
        }
    }


    public void placeOrder(OrderInput orderInput, boolean isSingleProductCheckOut) {
            List<OrderProductQuantity> productQuantityList = orderInput.getOrderProductQuantityList();
            String currentUser = JwtRequestFilter.CURRENT_USER;
            Optional<LocalUser> optionalUser = userDao.findById(currentUser);

            if (optionalUser.isPresent()) {
                LocalUser user = optionalUser.get();

                for (OrderProductQuantity o : productQuantityList) {
                    Optional<Product> optionalProduct = productDao.findById(o.getProductId());

                    if (optionalProduct.isPresent()) {
                        Product product = optionalProduct.get();

                        OrderDetail orderDetail = new OrderDetail(
                                orderInput.getFullName(),
                                orderInput.getFullAddress(),
                                orderInput.getContactNumber(),
                                product,
                                user,
                                orderInput.getAlternateContactNumber(),
                                ORDER_PLACED,
                                product.getProductActualPrice() * o.getQuantity()
                        );
                        //empty the cart
                        if(!isSingleProductCheckOut) {
                            List<Cart> carts =cartDao.findByUser(user);
                            carts.stream().forEach(x -> cartDao.deleteById(x.getCartId()));
                        }
                        orderDetailDao.save(orderDetail);
                    } else {
                        // Handle case where product is not found
                        // For example, you can log an error or throw an exception
                        System.err.println("Product not found for ID: " + o.getProductId());
                        // You can throw an exception here if you want to abort the order process
                    }
                }
            } else {
                // Handle case where user is not found
                // For example, you can log an error or throw an exception
                System.err.println("User not found for ID: " + currentUser);
                // You can throw an exception here if you want to abort the order process
            }
    }
}
