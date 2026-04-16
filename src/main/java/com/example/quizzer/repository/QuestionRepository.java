package com.example.quizzer.repository;

import com.example.quizzer.model.Question;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuizzId(Long quizzId);
}
