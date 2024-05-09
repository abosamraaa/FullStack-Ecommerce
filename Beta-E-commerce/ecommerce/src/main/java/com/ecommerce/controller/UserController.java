package com.ecommerce.controller;

import com.ecommerce.entity.LocalUser;
import com.ecommerce.models.RegistrationForm;
import com.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.validation.Valid;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostConstruct
    public void initRoleAndUser() throws Exception {
        userService.initRolesAndUsers();
    }

    @PostMapping({"/registerNewUser"})
    public LocalUser registerNewUser(@Valid @RequestBody RegistrationForm registrationForm) throws Exception {
        return userService.registerNewUser(registrationForm);
    }


    @GetMapping({"/forAdmin"})
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin(){
        return "This URL is only accessible to the admin";
    }



    @GetMapping({"/forUser"})
    @PreAuthorize("hasAnyRole('User')")
    public String forUser(){
        return "This URL is only accessible to the user";
    }
}
