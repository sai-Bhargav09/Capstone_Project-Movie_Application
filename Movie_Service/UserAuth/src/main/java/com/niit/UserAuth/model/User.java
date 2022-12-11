package com.niit.UserAuth.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class User {
    @Id
    private String email;
    private String userName;
    private String password;
    private String role;
    private int userImage;
}
