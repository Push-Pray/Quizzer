package com.example.quizzer.repository;

import com.example.quizzer.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public interface ReviewRepository extends JpaRepository <Review, Long> {

}
