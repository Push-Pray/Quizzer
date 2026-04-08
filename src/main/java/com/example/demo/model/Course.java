package com.example.demo.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToMany(fetch = FetchType.EAGER)
    private List <User> students = new ArrayList <>();

    @OneToOne()
    private User teacher;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "course")
    private List<Quizz> quizzes = new ArrayList <Quizz>();

    private String name;
    private String code;

    public Course(){


    }

    public Course(String name, String code){

        this.name = name;
        this.code = code;
    }

    public Long getId() {

        return id;
    }

    public List <User> getStudents() {

        return students;
    }

    public void setStudents(List <User> students) {

        this.students = students;
    }

    public User getTeacher() {

        return teacher;
    }

    public void setTeacher(User teacher) {

        this.teacher = teacher;
    }

    public List <Quizz> getQuizzes() {

        return quizzes;
    }

    public void setQuizzes(List <Quizz> quizzes) {

        this.quizzes = quizzes;
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public String getCode() {

        return code;
    }

    public void setCode(String code) {

        this.code = code;
    }
}
