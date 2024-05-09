package com.ecommerce.models;

import com.ecommerce.entity.OrderProductQuantity;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

public class OrderInput {
    @NotNull
    @NotBlank
    @Size(min=10)
    private String fullName;
    @NotNull
    @NotBlank
    private String fullAddress;
    @NotNull
    @NotBlank
    @Pattern(regexp = "^(?:\\+?20)?(?:1\\d{9}|0\\d{10})$", message = "Invalid Egyptian phone number")
    private String contactNumber;
    @NotNull
    @NotBlank
    @Pattern(regexp = "^(?:\\+?20)?(?:1\\d{9}|0\\d{10})$", message = "Invalid Egyptian phone number")
    private String alternateContactNumber;

    private List<OrderProductQuantity> orderProductQuantityList;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getFullAddress() {
        return fullAddress;
    }

    public void setFullAddress(String fullAddress) {
        this.fullAddress = fullAddress;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getAlternateContactNumber() {
        return alternateContactNumber;
    }

    public void setAlternateContactNumber(String alternateContactNumber) {
        this.alternateContactNumber = alternateContactNumber;
    }

    public List<OrderProductQuantity> getOrderProductQuantityList() {
        return orderProductQuantityList;
    }

    public void setOrderProductQuantityList(List<OrderProductQuantity> orderProductQuantityList) {
        this.orderProductQuantityList = orderProductQuantityList;
    }
}
