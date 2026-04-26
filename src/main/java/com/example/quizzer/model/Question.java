package com.example.quizzer.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Quizz quizz;

    private String text;
    private int difficulty = 1;
    private List<String> options = new ArrayList<>();
    private int correctIndex;

    private int correctAnswers = 0;
    private int wrongAnswers = 0;

    public Question() {

    }

    public Long getId() {

        return id;
    }

    public int getDifficulty() {

        return difficulty;
    }

    public void setDifficulty(int difficulty) {

        this.difficulty = difficulty;
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

    public List<String> getOptions() {

        return options;
    }

    public void setOptions(List<String> options) {

        this.options = options;
    }

    public int getCorrectIndex() {

        return correctIndex;
    }

    public void setCorrectIndex(int correctIndex) {

        this.correctIndex = correctIndex;
    }

    public int getCorrectAnswers() {

        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {

        this.correctAnswers = correctAnswers;
    }

    public int getWrongAnswers() {

        return wrongAnswers;
    }

    public void setWrongAnswers(int wrongAnswers) {

        this.wrongAnswers = wrongAnswers;
    }
}
