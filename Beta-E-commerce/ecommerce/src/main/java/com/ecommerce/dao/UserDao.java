package com.ecommerce.dao;

import com.ecommerce.entity.LocalUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends CrudRepository<LocalUser,String> {


}
