package com.example.demo.repository;

import com.example.demo.model.Quizz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface QuizzRepository extends JpaRepository<Quizz, Long> {

}
