package com.example.quizzer.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Quizz quizz;

    private String text;
    private List<String> options = new ArrayList <>();
    private int correctIndex;

    public Question(){


    }

    public Long getId() {

        return id;
    }

    public Quizz getQuizz() {

        return quizz;
    }

    public void setQuizz(Quizz quizz) {

        this.quizz = quizz;
    }

    public String getText() {

        return text;
    }

    public void setText(String text) {

        this.text = text;
    }

    public List <String> getOptions() {

        return options;
    }

    public void setOptions(List <String> options) {

        this.options = options;
    }

    public int getCorrectIndex() {

        return correctIndex;
    }

    public void setCorrectIndex(int correctIndex) {

        this.correctIndex = correctIndex;
    }
}
