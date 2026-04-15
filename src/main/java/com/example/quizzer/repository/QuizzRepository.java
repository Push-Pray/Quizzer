package com.example.quizzer.repository;

import com.example.quizzer.model.Quizz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface QuizzRepository extends JpaRepository<Quizz, Long> {

}
