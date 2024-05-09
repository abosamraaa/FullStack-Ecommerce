package com.ecommerce.service;

import com.ecommerce.configuration.JwtRequestFilter;
import com.ecommerce.dao.CartDao;
import com.ecommerce.dao.ProductDao;
import com.ecommerce.dao.UserDao;
import com.ecommerce.entity.Cart;
import com.ecommerce.entity.ImageModel;
import com.ecommerce.entity.LocalUser;
import com.ecommerce.entity.Product;
import com.ecommerce.models.ProductInput;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProductService {


    private ProductDao productDao;
    private final UserDao userDao;
    private CartDao cartDao;

    public ProductService(ProductDao productDao, UserDao userDao, CartDao cartDao) {
        this.productDao = productDao;
        this.userDao = userDao;
        this.cartDao = cartDao;
    }

    public Product addNewProduct(Product product ){
        return productDao.save(product);
    }

    public List<Product> getAllProducts(int pageNumber,String searchKey){
        Pageable pageable = PageRequest.of(pageNumber,10);
        if(searchKey.equals("")){
            return (List<Product>) productDao.findAll(pageable);
        }
        else {
            return productDao.findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(searchKey,searchKey,pageable);
        }
    }

    public Product getProductDetailsById(Integer productId){
        return productDao.findById(productId).get();
    }


    public Product updateProductDetails(Integer productId, ProductInput updatedProduct, MultipartFile[] imageFiles) throws IOException {
        Optional<Product> optionalProduct = productDao.findById(productId);
        if (optionalProduct.isPresent()) {
            Product existingProduct = optionalProduct.get();
            existingProduct.setProductName(updatedProduct.getProductName());
            existingProduct.setProductDescription(updatedProduct.getProductDescription());
            existingProduct.setProductDiscountedPrice(updatedProduct.getProductDiscountedPrice());
            existingProduct.setProductActualPrice(updatedProduct.getProductActualPrice());

            // Update product images if provided
            if (imageFiles != null && imageFiles.length > 0) {
                Set<ImageModel> images = uploadImage(imageFiles);
                existingProduct.setProductImages(images);
            }

            // Save the updated product
            return productDao.save(existingProduct);
        } else {
            return null; // Product with the given ID not found
        }
    }


    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
        Set<ImageModel> imageModels =new HashSet<>();
        for (MultipartFile file : multipartFiles){
            ImageModel imageModel =new ImageModel(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            imageModels.add(imageModel);
        }
        return imageModels;

    }
    public void deleteProductDetails(Integer productId){
        productDao.deleteById(productId);
    }


    public List<Product> getProductDetails(boolean isSingleProductCheckout, Integer productId){
        if(isSingleProductCheckout&& productId!=0){
            //we are going to buy a single product
            List<Product> list =new ArrayList<>();
            Product product =productDao.findById(productId).get();
            list.add(product);
            return list;
        }
        else{
            String userName=JwtRequestFilter.CURRENT_USER;
            LocalUser user =userDao.findById(userName).get();
            List<Cart> carts=cartDao.findByUser(user);

            return carts.stream().map(x->x.getProduct()).collect(Collectors.toList());
        }
        

    }
}
