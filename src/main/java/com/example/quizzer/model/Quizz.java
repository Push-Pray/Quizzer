package com.example.quizzer.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.AbstractList;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Quizz {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String course;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "quizz")
    private List<Question> questions = new ArrayList <Question>();

    private String name;
    private String description;
    private boolean published = false;
    private final LocalDate creationDate = LocalDate.now();
    private String category;

    public Quizz() {

    }

    public Quizz(String name) {

        this.name = name;
    }

    public String getCategory() {

        return category;
    }

    public void setCategory(String category) {

        this.category = category;
    }

    public Long getId() {

        return id;
    }

    public String getCourse() {

        return course;
    }

    public void setCourse(String course) {

        this.course = course;
    }

    public List <Question> getQuestions() {

        return questions;
    }

    public void setQuestions(List <Question> questions) {

        this.questions = questions;
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

    public boolean isPublished() {

        return published;
    }

    public void setPublished(boolean published) {

        this.published = published;
    }

    public LocalDate getCreationDate() {

        return creationDate;
    }
}
