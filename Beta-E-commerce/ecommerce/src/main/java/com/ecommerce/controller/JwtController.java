package com.ecommerce.controller;

import com.ecommerce.dao.UserDao;
import com.ecommerce.entity.LocalUser;
import com.ecommerce.models.LoginForm;
import com.ecommerce.models.LoginResponse;
import com.ecommerce.service.JwtService;
import com.ecommerce.util.JwtUtil;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin

public class JwtController {


    private JwtService jwtService;

    public JwtController(JwtService jwtService, UserDao userDao) {
        this.jwtService = jwtService;
        this.userDao = userDao;
    }

    private JwtUtil jwtUtil;

    private UserDao userDao;


    @PostMapping({"/authenticate"})
    public LoginResponse createJwtToken(@Valid @RequestBody LoginForm loginForm) throws Exception{
        return jwtService.createJwtToken(loginForm);
    }

    @PreAuthorize("hasRole('User')")
    @GetMapping("/getUserDetails")
    public LocalUser getUserDetails(){
        return jwtService.getUserDetails();
    }

}
