package com.example.demo.model;

import jakarta.persistence.*;

import java.util.AbstractList;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Quizz {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Course course;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "quizz")
    private List<Question> questions = new ArrayList <Question>();

    private String name;

    public Quizz() {

    }

    public Quizz(String name) {

        this.name = name;
    }

    public Long getId() {

        return id;
    }

    public Course getCourse() {

        return course;
    }

    public void setCourse(Course course) {

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
}
