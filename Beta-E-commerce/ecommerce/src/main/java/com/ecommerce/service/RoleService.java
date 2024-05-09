package com.ecommerce.service;

import com.ecommerce.entity.Role;
import com.ecommerce.dao.RoleDao;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    public RoleService(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    private RoleDao roleDao;

    public Role creaNewRole(Role role){
        return  roleDao.save(role);
    }
}
