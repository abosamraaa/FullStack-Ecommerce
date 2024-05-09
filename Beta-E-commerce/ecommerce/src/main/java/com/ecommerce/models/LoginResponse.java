package com.ecommerce.models;

import com.ecommerce.entity.LocalUser;

public class LoginResponse {
    private LocalUser user;
    private String jwtToken;

    public LoginResponse(LocalUser user, String jwtToken) {
        this.user = user;
        this.jwtToken = jwtToken;
    }

    public LocalUser getUser() {
        return user;
    }

    public void setUser(LocalUser user) {
        this.user = user;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }
}
