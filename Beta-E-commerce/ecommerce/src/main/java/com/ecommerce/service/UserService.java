package com.ecommerce.service;

import com.ecommerce.dao.RoleDao;
import com.ecommerce.dao.UserDao;
import com.ecommerce.entity.LocalUser;
import com.ecommerce.entity.Role;
import com.ecommerce.models.RegistrationForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {
    private UserDao userDao;

    private RoleDao roleDao;



    public UserService(UserDao userDao, RoleDao roleDao) {
        this.userDao = userDao;
        this.roleDao = roleDao;

    }

    public LocalUser registerNewUser(RegistrationForm registrationForm) throws Exception {

        // Check if the username already exists
        if (userDao.findById(registrationForm.getUserName()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        LocalUser user =new LocalUser();
        Role role = roleDao.findById("User").orElseThrow(() -> new RuntimeException("Default role not found"));
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);
        user.setUserName(registrationForm.getUserName());
        //Hash the password
        user.setUserPassword(getEncodedPassword(registrationForm.getUserPassword()));

        user.setUserFirstName(registrationForm.getUserFirstName());
        user.setUserLastName(registrationForm.getUserLastName());


        user.setEmail(registrationForm.getEmail());

        return userDao.save(user);
    }




    public void initRolesAndUsers() throws Exception {
        Role adminRole =new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleDao.save(adminRole);

        Role userRole =new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default role for newly created record");
        roleDao.save(userRole);

        LocalUser adminUser =new LocalUser();
        adminUser.setUserFirstName("admin");
        adminUser.setUserLastName("admin");
        adminUser.setUserName("admin123");
        adminUser.setUserPassword(getEncodedPassword("admin@pass"));
        adminUser.setEmail("admin@gmai.com");
        Set<Role> adminRoles =new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRoles(adminRoles);
        userDao.save(adminUser);


        LocalUser user =new LocalUser();
        user.setUserFirstName("user");
        user.setUserLastName("user");
        user.setUserName("user123");
        user.setUserPassword(getEncodedPassword("user@gamo.com"));
        user.setEmail("user@gmail.com");
        Set<Role> userRoles =new HashSet<>();
        user.setRoles(userRoles);
        userRoles.add(userRole);
        userDao.save(user);


    }

    //function to encode the password
    public static String getEncodedPassword(String password) {
        return sha256Hash(password);
    }

    //Hashing using Sha2
    private static String sha256Hash(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }



}