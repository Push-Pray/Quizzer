package com.example.quizzer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.example.quizzer.model.Review;

import jakarta.transaction.Transactional;

@Service
public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByQuizzId(Long quizzId);

    @Transactional
    @Modifying
    @Query("delete from Review r where r.id = :reviewId")
    int deleteReviewById(Long reviewId);
}
