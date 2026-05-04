package com.example.quizzer.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonIgnore
    @ManyToOne
    private Quizz quizz;


    private String nickname;
    private int grade;
    private String text;
    private final LocalDate creationDate = LocalDate.now();

    public Review(){


    }

    public Review(String nickname, int grade, String text) {

        this.nickname = nickname;
        this.grade = grade;
        this.text = text;
    }

    public LocalDate getCreationDate() {

        return creationDate;
    }

    public Quizz getQuizz() {

        return quizz;
    }

    public void setQuizz(Quizz quizz) {

        this.quizz = quizz;
    }

    public String getNickname() {

        return nickname;
    }

    public void setNickname(String nickname) {

        this.nickname = nickname;
    }

    public int getGrade() {

        return grade;
    }

    public void setGrade(int grade) {

        this.grade = grade;
    }

    public String getText() {

        return text;
    }

    public void setText(String text) {

        this.text = text;
    }

    public Long getId() {

        return id;
    }
}
