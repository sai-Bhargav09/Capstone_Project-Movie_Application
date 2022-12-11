package com.niit.UserAuth.security;

import com.niit.UserAuth.model.User;

import java.util.Map;

public interface SecurityTokenGenerator {
    public Map<String,String> generateToken(User user);

}
