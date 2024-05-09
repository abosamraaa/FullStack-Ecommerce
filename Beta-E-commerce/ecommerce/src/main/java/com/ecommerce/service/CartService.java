package com.ecommerce.service;

import com.ecommerce.configuration.JwtRequestFilter;
import com.ecommerce.dao.CartDao;
import com.ecommerce.dao.ProductDao;
import com.ecommerce.dao.UserDao;
import com.ecommerce.entity.Cart;
import com.ecommerce.entity.LocalUser;
import com.ecommerce.entity.Product;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {
    private CartDao cartDao;
    private ProductDao productDao;
    private UserDao userDao;

    public CartService(CartDao cartDao, ProductDao productDao, UserDao userDao) {
        this.cartDao = cartDao;
        this.productDao = productDao;
        this.userDao = userDao;
    }


    public void deleteCartItem(Integer cartId){
        cartDao.deleteById(cartId);
    }

    public Cart addToCart(Integer productId){
        Product product= productDao.findById(productId).get();

        String userName= JwtRequestFilter.CURRENT_USER;

        LocalUser user =null;
        if(userName!=null) {
             user = userDao.findById(userName).get();
        }

        List <Cart> cartList=cartDao.findByUser(user);

        List <Cart>filterList= cartList.stream().filter(x->x.getProduct().getProductId() == productId).collect(Collectors.toList());

        if (!filterList.isEmpty()){
            return  null;
        }

        if(product!=null && user !=null){
            Cart cart =new Cart(product,user);
            return cartDao.save(cart);
        }
    return null;
    }

    public List<Cart> getCArtDetails(){
        String username=JwtRequestFilter.CURRENT_USER;
        LocalUser user=userDao.findById(username).get();
        return cartDao.findByUser(user);

    }
}
