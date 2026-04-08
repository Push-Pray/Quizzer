package com.example.demo.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "UserTable")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String passwordHash;
    private String role;

    @ManyToMany(mappedBy = "students", fetch = FetchType.EAGER)
    private List<Course> courses = new ArrayList<Course>();

    public User(){


    }

    public User(String username, String passwordHash){

        this.username = username;
        this.passwordHash = passwordHash;
    }

    public Long getId() {

        return id;
    }

    public String getUsername() {

        return username;
    }

    public void setUsername(String username) {

        this.username = username;
    }

    public String getPasswordHash() {

        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {

        this.passwordHash = passwordHash;
    }

    public String getRole() {

        return role;
    }

    public void setRole(String role) {

        this.role = role;
    }

    public List <Course> getCourses() {

        return courses;
    }

    public void setCourses(List <Course> courses) {

        this.courses = courses;
    }
}

