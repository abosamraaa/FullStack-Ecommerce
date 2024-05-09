package com.ecommerce.entity;

import javax.persistence.*;

@Entity
@Table(name = "image_model")
public class ImageModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long imageId;
    private String imageName;
    private String imageType;
    @Column(length = 999999999)
    private byte[] picByte;

    public Long getImageId() {
        return imageId;
    }

    public void setImageId(Long imageId) {
        this.imageId = imageId;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public byte[] getPicByte() {
        return picByte;
    }

    public void setPicByte(byte[] picByte) {
        this.picByte = picByte;
    }

    public ImageModel(String imageName, String imageType, byte[] picByte) {
        this.imageName = imageName;
        this.imageType = imageType;
        this.picByte = picByte;
    }

    public ImageModel() {
    }
}
