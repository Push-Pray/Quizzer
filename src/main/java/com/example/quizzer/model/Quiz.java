package com.example.quizzer.model;

import jakarta.persistence.*;


@Entity
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String description;
    private String courseCode;
    private boolean published;

    // --- Constructors ---
    public Quiz() {
    }

    public Quiz(String name, String description, String courseCode, boolean published) {
        this.name = name;
        this.description = description;
        this.courseCode = courseCode;
        this.published = published;
    }

    // --- Getters & Setters ---
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }
}
