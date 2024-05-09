package com.ecommerce.controller;

import com.ecommerce.entity.ImageModel;
import com.ecommerce.entity.Product;
import com.ecommerce.models.ProductInput;
import com.ecommerce.service.ProductService;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.Set;

@RestController

public class ProductController {
    private ProductService productService;


    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PreAuthorize("hasRole('Admin')")
    @PostMapping(value = {"/addNewProduct"},consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Product addNewProduct(@Valid @RequestPart("product") ProductInput productInput,
                                 @RequestPart(value = "imageFile", required = false) MultipartFile[] file){
        try {
            Product product =new Product();

            product.setProductName(productInput.getProductName());
            product.setProductDescription(productInput.getProductDescription());
            product.setProductActualPrice(productInput.getProductActualPrice());
            product.setProductDiscountedPrice(productInput.getProductDiscountedPrice());
            Set<ImageModel> images= productService.uploadImage(file);
            product.setProductImages(images);

            return productService.addNewProduct(product);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }




    @PreAuthorize("hasRole('Admin')")
    @PutMapping("/updateProductDetails/{productId}")
    public Product updateProductDetails(@PathVariable Integer productId,
                                        @RequestPart("product") @Valid ProductInput productInput,
                                        @RequestPart(value = "imageFile", required = false) MultipartFile[] imageFiles) throws IOException {
        return productService.updateProductDetails(productId, productInput, imageFiles);
    }


    @GetMapping({"/getAllProducts"})
    public List<Product> getAllProducts(@RequestParam(defaultValue = "0") int pageNumber,@RequestParam(defaultValue = "") String searchKey){
        List<Product> result= productService.getAllProducts(pageNumber,searchKey);
        System.out.println("Result size is "+result.size());
        return result;
    }



    @PreAuthorize("hasRole('Admin')")
    @GetMapping({"/getProductsDetailsById/{productId}"})
    public Product getProductDetailById(@PathVariable Integer productId){
        return productService.getProductDetailsById(productId);
    }



    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping({"/deleteProductDetails/{productId}"})
    public void deleteProductDetails(@PathVariable("productId") Integer productId){
        productService.deleteProductDetails(productId);
    }


    @PreAuthorize("hasRole('User')")
    @GetMapping({"/getProductDetails/{isSingleProductCheckout}/{productId}"})
    public List<Product> getProductDetails(@PathVariable boolean isSingleProductCheckout,@PathVariable Integer productId){
        return productService.getProductDetails(isSingleProductCheckout,productId);
    }

}
